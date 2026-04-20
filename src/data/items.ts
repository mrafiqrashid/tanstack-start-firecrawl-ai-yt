import { prisma } from "@/db";
import { firecrawl } from "@/lib/firecrawl";
import { openrouter } from "@/lib/openRouter";
import { authFnMiddleware } from "@/middlewares/auth";
import { bulkImportSchema, extractSchema, importSchema, searchSchema } from "@/schemas/import";
import { SearchResultWeb } from "@mendable/firecrawl-js";
import { notFound } from '@tanstack/react-router';
import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import z from "zod";

export const scrapeUrlFn = createServerFn({ method: 'POST' })
    .middleware([authFnMiddleware])
    .inputValidator(importSchema)
    .handler(async ({ data, context }) => {

        const item = await prisma.savedItem.create({

            data: {
                url: data.url,
                userId: context.session?.user?.id, // TODO: get from session
                status: 'PROCESSING',
            },
        })

        try {
            const result = await firecrawl.scrape(data.url, {
                formats: ['markdown', {
                    type: 'json',
                    // schema: extractSchema
                    prompt: 'please extract the author and also publishedAt timestamp',
                }],
                location: {
                    country: 'US',
                    languages: ['en'],
                },
                onlyMainContent: true, // Optional: Only scrape the main content of the page
                // You can also specify other options like maxDepth, custom user-agent, etc. Refer to the Firecrawl documentation for more details.
                proxy: 'auto'
            });

            const jsonData = result.json as z.infer<typeof extractSchema>


            let publishedAt = null;

            if (jsonData.publishedAt) {
                const parsedDate = new Date(jsonData.publishedAt);
                if (!isNaN(parsedDate.getTime())) {
                    publishedAt = parsedDate;
                }
            }

            const updatedItem = await prisma.savedItem.update({
                where: {
                    id: item.id,
                },
                data: {
                    title: result.metadata?.title || null, // Assuming the result has a title property with the scraped title
                    content: result.markdown || null, // Assuming the result has a markdown property with the scraped content
                    ogImage: result.metadata?.ogImage || null, // Assuming the result has an ogImage property with the URL of the Open Graph image
                    author: jsonData.author || null, // Using the extracted author from the JSON data
                    publishedAt: publishedAt, // Using the parsed publishedAt from the JSON data
                    status: 'COMPLETED',
                },
            })

            return updatedItem
        } catch (error) {
            const failedItem = await prisma.savedItem.update({
                where: {
                    id: item.id,
                },
                data: {
                    status: 'FAILED',
                },
            });
            return failedItem
        }
    })


export const mapUrlFn = createServerFn({ method: 'POST' })
    .middleware([authFnMiddleware])
    .inputValidator(bulkImportSchema)
    .handler(
        async ({ data }) => {
            const result = await firecrawl.map(data.url, {
                limit: 25,
                search: data.search,
                location: {
                    country: 'US',
                    languages: ['en'],
                }
            });

            return result.links
        })

export type BulkScrapeProgress = {
    completed: number
    total: number
    url: string
    status: 'idle' | 'scrapping' | 'success' | 'failed'
}

export const bulkScrapeUrlsFn = createServerFn({ method: 'POST' })
    .middleware([authFnMiddleware])
    .inputValidator(
        z.object({
            urls: z.array(z.string().url()),
        }),
    )
    .handler(async function* ({ data, context }) {
        const total = data.urls.length

        for (const url of data.urls) {
            const item = await prisma.savedItem.create({
                data: {
                    url,
                    userId: context.session?.user?.id, // TODO: get from session
                    status: 'PENDING',
                },
            })

            let status: BulkScrapeProgress['status'] = 'success'

            try {
                const result = await firecrawl.scrape(url, {
                    formats: ['markdown', {
                        type: 'json',
                    // schema: extractSchema
                        prompt: 'please extract the author and also publishedAt timestamp',
                    }],
                    location: {
                        country: 'US',
                        languages: ['en'],
                    },
                    onlyMainContent: true, // Optional: Only scrape the main content of the page
                    // You can also specify other options like maxDepth, custom user-agent, etc. Refer to the Firecrawl documentation for more details.
                    proxy: 'auto'
                });

                const jsonData = result.json as z.infer<typeof extractSchema>


                let publishedAt = null;

                if (jsonData.publishedAt) {
                    const parsedDate = new Date(jsonData.publishedAt);
                    if (!isNaN(parsedDate.getTime())) {
                        publishedAt = parsedDate;
                    }
                }

                await prisma.savedItem.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        title: result.metadata?.title || null, // Assuming the result has a title property with the scraped title
                        content: result.markdown || null, // Assuming the result has a markdown property with the scraped content
                        ogImage: result.metadata?.ogImage || null, // Assuming the result has an ogImage property with the URL of the Open Graph image
                        author: jsonData.author || null, // Using the extracted author from the JSON data
                        publishedAt: publishedAt, // Using the parsed publishedAt from the JSON data
                        status: 'COMPLETED',
                    },
                })

            } catch (error) {
                status = 'failed'

                await prisma.savedItem.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        status: 'FAILED',
                    },
                });
            }

            const progress: BulkScrapeProgress = {
                completed: data.urls.indexOf(url) + 1,
                total,
                url: url,
                status,
            }

            yield progress

        }
    })


export const getItemFn = createServerFn({ method: 'GET' })
    .middleware([authFnMiddleware])
    .handler(async ({ context }) => {

        await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay

        const items = await prisma.savedItem.findMany({
            where: {
                userId: context.session?.user?.id, // TODO: get from session
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return items
    })

export const getItemByIdFn = createServerFn({ method: 'GET' })
    .middleware([authFnMiddleware])
    .inputValidator(z.object({
        id: z.string(),
    }))
    .handler(async ({ context, data }) => {
        const item = await prisma.savedItem.findUnique({
            where: {
                userId: context.session?.user?.id,
                id: data.id,
            },
        })

        if (!item) {
            throw notFound()
        }

        return item
    }
    )


export const saveSummaryAndGenerateTagsFn = createServerFn({ method: 'POST' })
    .middleware([authFnMiddleware])
    .inputValidator(z.object({
        id: z.string(),
        summary: z.string(),
    }))
    .handler(async ({ context, data }) => {

        const existingItem = await prisma.savedItem.findUnique({
            where: {
                id: data.id,
                userId: context.session?.user?.id,
            },
        })

        if (!existingItem) {
            throw notFound()
        }

        const { text } = await generateText({
            model: openrouter.chat('nvidia/nemotron-3-super-120b-a12b:free'),
            system: 'You are a helpful assistant that extracts relevant tags from content summaries. Extract 3-5 short, relavant tags that categorize the content. Return ONLY a comma-seperated list of tags, nothing else. Ecample: technology, ai, startups',
            prompt: `Extract tags from this summary:\n\n${data.summary}`
        })

        const tags = text.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0).slice(0, 5) // Limit to 5 tags

        await prisma.savedItem.update({
            where: {
                id: data.id,
            },
            data: {
                summary: data.summary,
                tags: tags, // Here you would typically generate tags based on the summary or content
            },
        })
    })

export const searchWebFn = createServerFn({ method: 'POST' })
    .middleware([authFnMiddleware])
    .inputValidator(searchSchema)
    .handler(async ({ data }) => {

        console.warn('Searching the web with query:', data.query)
        const result = await firecrawl.search(data.query, {
            limit: 15,
            location: 'Germany',
            tbs: 'qdr:y', // past year
        });

        return result.web?.map((item) => ({
            url: (item as SearchResultWeb).url,
            title: (item as SearchResultWeb).title,
            description: (item as SearchResultWeb).description,
        })) as SearchResultWeb[]
    })



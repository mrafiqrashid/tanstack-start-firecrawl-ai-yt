import { prisma } from '@/db'
import { openrouter } from '@/lib/openRouter'
import { createFileRoute } from '@tanstack/react-router'
import { streamText } from 'ai'

export const Route = createFileRoute('/api/ai/summary')({
    server: {
        handlers: {
            POST: async ({ request, context }) => {
                // Your logic for handling the POST request goes here

                console.warn('Handling POST request for AI summary')

                const { itemId, prompt } = await request.json()

                if (!itemId || !prompt) {
                    return new Response('Missing itemId or prompt', { status: 400 })
                }

                const item = await prisma.savedItem.findUnique({
                    where: {
                        id: itemId,
                        userId: context?.session?.user?.id, // Ensure the item belongs to the authenticated user
                    },
                })

                if (!item) {
                    return new Response('Item not found', { status: 404 })
                }

                // Call your AI summarization function here, e.g.:
                // const summary = await summarizeContent(item.content, prompt)

                // Stream summary
                const result = streamText({
                    model: openrouter.chat('nvidia/nemotron-3-super-120b-a12b:free'),
                    system: 'You are a helpful assistant that creates concise, informative summaries of web content. Your summaries should: 1. Be 2-3 paragraphs long. 2. Capture the main points and key takeaways. 3. Be written in a clear and engaging style that is easy to understand. 4. Avoid unnecessary jargon or technical language, while still conveying the essential information.',
                    prompt: `Please summarize the following content:\n\n${prompt}`
                })

                // Return the stream in the format useCompletion expected
                return result.toTextStreamResponse()
            }

        }
    }
})



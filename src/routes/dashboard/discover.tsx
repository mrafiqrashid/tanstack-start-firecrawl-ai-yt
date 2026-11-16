import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { Loader2, Search, Sparkles } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import type { SearchResultWeb } from '@mendable/firecrawl-js'
import type { BulkScrapeProgress} from '@/data/items';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { bulkScrapeUrlsFn, searchWebFn } from '@/data/items'
import { searchSchema } from '@/schemas/import'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/dashboard/discover')({
  head: () => ({ meta: seo({ title: 'Discover', description: 'Search the web and save the best results to Recall.' }) }),
  component: RouteComponent,
})

function RouteComponent() {

  const [isPending, startTransition] = useTransition()
  const [isBulkPending, startBulkTransition] = useTransition()
  const [searchResult, setSearchResult] = useState<Array<SearchResultWeb>>([])
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState<BulkScrapeProgress | null>(null)

  function handleSelectAll() {
    if (selectedUrls.size === searchResult.length) {
      setSelectedUrls(new Set())
    } else {
      setSelectedUrls(new Set(searchResult.map((link) => link.url)))
    }
  }

  function handleToggleUrl(url: string) {
    const newSelected = new Set(selectedUrls)

    if (newSelected.has(url)) {
      newSelected.delete(url)
    }
    else {
      newSelected.add(url)
    }

    setSelectedUrls(newSelected)
  }

  async function handleBulkImport() {
    startBulkTransition(async () => {
      if (selectedUrls.size === 0) {
        toast.error('Please select at least one URL to import.')
        return
      }

      setProgress({
        completed: 0,
        total: selectedUrls.size,
        url: '',
        status: 'success'
      })

      let successCount = 0
      let failedCount = 0


      for await (const update of await bulkScrapeUrlsFn({
        data: {
          urls: Array.from(selectedUrls)
        }
      })) {
        setProgress(update)

        if (update.status === 'success') {
          successCount++
        }
        else {
          failedCount++
        }
      }

      if (failedCount > 0) {
        toast.success(`Imported ${successCount} Urls (${failedCount}) failed`)
      }
      else {
        toast.success(`Successfully imported ${successCount} URLs`)
      }


    })

  }

  const form = useForm({
    defaultValues: {
      query: "",
    },
    validators: {
      onSubmit: searchSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(async () => {
        const result = await searchWebFn({
          data: {
            query: value.query
          }
        })

        setSearchResult(result)
      })

    },
  })

  return (
    <div className="flex flex-1 items-center justify-center py-8">
      <div className='w-full max-w-2xl space-y-6 px-4'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold'>
            Discover
          </h1>
          <p className='text-muted-foreground pt-2'>
            Search the web for articles on any topic
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-3'>
              <Sparkles className='size-5 text-primary' />
              Topic Search
            </CardTitle>
            <CardDescription>
              Search the web for content and import what you find interesting.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <FieldGroup>
                <form.Field
                  name="query"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="e.g., React Server Component tutorial"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                />

                <Button disabled={isPending} type="submit">
                  {isPending ? (
                    <>
                      <Loader2 className='size-4 animated-spin' />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className='size-4' />
                      Search Web
                    </>
                  )}
                </Button>
              </FieldGroup>
            </form>

            {/* Discovered URLs list */}
            {searchResult.length > 0 && (
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium'>Found {searchResult.length} URLs</p>
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    onClick={handleSelectAll}
                  >
                    {searchResult.length === selectedUrls.size ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <div className='max-h-80 space-y-8 overflow-y-auto rounded-md border p-4'>
                  {searchResult.map((link) => (
                    <label
                      key={link.url}
                      className='hover:bg:muted/50 flex cursor-pointer items-start gap-3 rounded-md p-2'
                    >
                      <Checkbox
                        className='mt-0.5'
                        checked={selectedUrls.has(link.url)}
                        onCheckedChange={() => handleToggleUrl(link.url)}
                      />
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium'>
                          {link.title ?? 'Title has not been found'}
                        </p>
                        <p className='text-muted-foreground truncate text-xs'>
                          {link.description ?? 'Description has not been found'}
                        </p>
                        <p className='text-muted-foreground truncate text-xs'>
                          {link.url}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {progress && (
                  <div className='spave-y-2'>
                    <div className='flex items-center justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Importing: {progress.completed} / {progress.total}
                      </span>
                      <span className='font-medium'>
                        {Math.round(progress.completed / progress.total)}
                      </span>
                    </div>
                    <Progress value={progress.completed / progress.total * 100} />
                  </div>
                )}

                <Button
                  onClick={handleBulkImport}
                  className='w-full'
                  disabled={isBulkPending}
                  type='button'
                >
                  {isBulkPending ? (
                    <>
                      <Loader2 className='size-4 animate-spin' />
                      {progress ?
                        `Importing ${progress.completed}/${progress.total}...` :
                        `Starting...`
                      }
                    </>
                  ) : (
                    `Import ${selectedUrls.size} Url`
                  )}
                </Button>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

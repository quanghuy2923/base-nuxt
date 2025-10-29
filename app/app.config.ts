export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      secondary: 'content',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: ['rounded-2xl']
      },
      variants: {
        size: {
          xl: {
            base: 'rounded-4xl px-4 py-2'
          }
        }
      }
    },
    card: {
      slots: {
        root: 'rounded-3xl px-4 py-3'
      }
    },
    input: {
      slots: {
        base: 'rounded-2xl'
      }
    },
    header: {
      slots: {
        container:
          'max-w-8xl w-full mx-auto px-4 sm:px-8 lg:px-30  flex items-center justify-between',
        body: 'px-0 sm:px-4 lg:px-6'
      }
    },
    navigationMenu: {
      slots: {
        list: 'gap-10'
      },
      compoundVariants: [
        {
          orientation: 'horizontal',
          contentOrientation: 'horizontal',
          class: {
            viewport: 'w-[960px] max-h-[75vh] h-auto',
            content: 'max-h-[75vh]'
          }
        },
        {
          orientation: 'horizontal',
          contentOrientation: 'vertical',
          class: {
            content: 'w-fit h-auto max-h-none overflow-visible'
          }
        },
        {
          disabled: false,
          active: false,
          variant: 'pill',
          class: {
            link: 'hover:text-primary hover:before:bg-transparent data-[state=open]:text-primary data-[state=open]:before:bg-transparent cursor-pointer',
            childLink: 'hover:text-primary hover:before:bg-blue-100 cursor-pointer'
          }
        },
        {
          disabled: false,
          variant: 'pill',
          highlight: true,
          orientation: 'horizontal',
          class: {
            link: 'data-[state=open]:before:bg-transparent'
          }
        },
        {
          disabled: false,
          active: false,
          variant: 'link',
          class: {
            link: 'hover:text-primary hover:before:bg-transparent data-[state=open]:text-primary data-[state=open]:before:bg-transparent',
            childLink: 'hover:text-primary hover:before:bg-transparent'
          }
        }
      ]
    }
  }
})

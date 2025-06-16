import { cn } from "@/lib/utils.ts"
import type { PropsWithChildren } from "react"

type StoryProps = PropsWithChildren<{
  rootClassName?: string
  src?: string
  layout?: "row" | "col"
  className?: string
}>

const Story = ({
  children,
  layout = "col",
  src,
  className,
  rootClassName,
}: StoryProps) => (
  <div className="flex flex-col gap-4">
    <div className={cn("@container", rootClassName)}>
      {src ? (
        <div
          className={cn(
            "flex items-start gap-[20px] [body.dark_&]:relative",
            layout === "col" && "flex-col",
            layout === "row" && "flex-row"
          )}
        >
          <div className={cn("flex flex-none flex-col bg-grey-4 p-3")}>
            <small className="text-white">COMPONENT</small>
            <div className={cn("border-[1px] border-white", className)}>
              {children}
            </div>
          </div>
          <div
            className={cn(
              "flex flex-none flex-col bg-grey-4 p-3",
              "[body.dark_&]:absolute [body.dark_&]:w-max [body.dark_&]:opacity-50"
            )}
          >
            <small className="text-white">IMAGE</small>
            <img
              className={cn("border-[1px] border-white", className)}
              src={src}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className={cn("", className)}>{children}</div>
      )}
    </div>
  </div>
)

type StoryVariantProps = Omit<StoryProps, "rootClassName">

const StoryDesktop = ({ children, className, ...props }: StoryVariantProps) => {
  return (
    <Story
      {...props}
      rootClassName="w-[1464px]" // 1440px = lg width + 24px (paddings)
      className={cn("w-[1440px]", className)}
    >
      {children}
    </Story>
  )
}

const StoryTablet = ({ children, className, ...props }: StoryVariantProps) => {
  return (
    <Story
      {...props}
      rootClassName="w-[768px]" // 744px = md width + 24px (paddings)
      className={cn("w-[744px]", className)}
    >
      {children}
    </Story>
  )
}

const StoryMobile = ({
  children,
  className,
  layout = "row",
  ...props
}: StoryVariantProps) => {
  return (
    <Story
      {...props}
      layout={layout}
      rootClassName="w-[399px]" // 375px = sm width + 24px (paddings)
      className={cn("w-[375px]", className)}
    >
      {children}
    </Story>
  )
}

const StoryResponsive = ({ children, className }: StoryVariantProps) => {
  return <div className={cn("@container", className)}>{children}</div>
}

function Title(props: PropsWithChildren) {
  return <h1 className="text-black dark:text-white">{props.children}</h1>
}

Story.Mobile = StoryMobile
Story.Desktop = StoryDesktop
Story.Tablet = StoryTablet
Story.Title = Title
Story.Responsive = StoryResponsive

export { Story }

import { Heading } from "@/shared/ui/Heading"

export default function ServerNotFound() {
    return <div className="flex flex-col flex-1 gap-4 justify-center items-center w-full">
        <Heading className="text-8xl text-element-sub -mt-20">404</Heading>
        <Heading className="text-4xl text-element-sub">Server not found</Heading>
    </div>
}

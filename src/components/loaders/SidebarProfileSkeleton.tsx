import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"



type Props = {
    isCollapsed: boolean
}



export default function SidebarProfileSkeleton({ isCollapsed }: Props) {

    return (

        <motion.div
            layout
            className={`flex ${isCollapsed ? "flex-col" : ""} items-center justify-between mb-4 gap-3`}
        >

            {/* LEFT SIDE */}
            {!isCollapsed && (
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <Skeleton className="h-10 w-10 rounded-full" />

                    {/* Name + Username */}
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
            )}


            {/* COLLAPSED AVATAR */}
            {isCollapsed && (
                <Skeleton className="h-10 w-10 rounded-full" />
            )}


            {/* THEME TOGGLER PLACEHOLDER */}
            <Skeleton className="h-8 w-8 rounded-md" />

            
        </motion.div>

    )

}

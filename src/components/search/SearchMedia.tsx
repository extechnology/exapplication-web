
import { searchDummy } from "@/lib/searchDummy";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Image as ImageIcon } from "lucide-react";

export default function SearchMedia() {
    const media = searchDummy.media || [];

    if (media.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No media found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in zoom-in-95 duration-500">
            {media.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-0 bg-transparent shadow-none">
                    <CardContent className="p-0 relative aspect-video rounded-xl overflow-hidden bg-muted">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                        {/* Type Indicator */}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-white text-[10px] uppercase font-bold flex items-center gap-1">
                            {item.type === 'video' ? <PlayCircle size={10} /> : <ImageIcon size={10} />}
                            {item.type}
                        </div>

                        {/* Title Overlay on Hover */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs font-medium truncate">{item.title}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

import { motion } from "framer-motion";

export default function ArticleLayout({
    title,
    coverImage,
    author,
    date,
    readTime,
    children,
}) {
    return (
        <section className="relative bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 min-h-screen">
            <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="
          mx-auto
          max-w-[820px]
          px-4
          sm:px-6
          pt-24
          pb-24
        "
            >
                {/* Hero Image */}
                {coverImage && (
                    <motion.div
                        initial={{ scale: 1.03, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-10 overflow-hidden rounded-2xl shadow-elevate"
                    >
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full aspect-video object-cover"
                        />
                    </motion.div>
                )}

                {/* Title */}
                <h1 className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          tracking-tight
          text-ink
          dark:text-white
          leading-tight
          mb-6
        ">
                    {title}
                </h1>

                {/* Meta Info */}
                <div className="
          flex
          flex-wrap
          items-center
          gap-3
          text-sm
          font-medium
          text-ink-soft
          dark:text-slate-400
          mb-10
        ">
                    {author && <span className="text-ink dark:text-slate-200">{author}</span>}
                    {author && (date || readTime) && <span>•</span>}
                    {date && <span>{date}</span>}
                    {readTime && <span>• {readTime} min read</span>}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-slate-200 dark:bg-slate-800 mb-12" />

                {/* Article Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: { staggerChildren: 0.06 },
                        },
                    }}
                    className="
            prose
            prose-lg
            prose-slate
            dark:prose-invert
            max-w-none
            leading-relaxed
            prose-headings:font-bold
            prose-headings:text-ink
            dark:prose-headings:text-white
            prose-p:text-ink-soft
            dark:prose-p:text-slate-300
            prose-a:text-brand
            prose-img:rounded-xl
            prose-img:shadow-soft
          "
                >
                    {children}
                </motion.div>
            </motion.article>
        </section>
    );
}

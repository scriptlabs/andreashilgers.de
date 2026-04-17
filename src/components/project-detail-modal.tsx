"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  RiCloseLine,
  RiExternalLinkLine,
  RiGithubFill,
  RiCheckLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  details?: string;
  features?: string[];
  tech: string[];
  link: string;
  githubLink?: string;
  logo?: string;
  images?: string[];
}

interface ProjectDetailModalProps {
  project: ProjectItem;
  children: React.ReactNode;
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-[var(--muted)] border border-[var(--border)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <RiArrowLeftSLine size={18} />
          </button>
          <button
            onClick={() => setCurrent((c) => (c + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-10"
          >
            <RiArrowRightSLine size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white w-3" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectLogo({ logo, title }: { logo?: string; title: string }) {
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  if (logo) {
    return (
      <div className="h-12 max-w-[110px] flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--muted)] shrink-0 shadow-sm px-3 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt={`${title} logo`} className="max-h-8 w-auto object-contain" />
      </div>
    );
  }

  return (
    <div className="w-14 h-14 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center text-lg font-black shrink-0 shadow-sm">
      {initials}
    </div>
  );
}

export function ProjectDetailModal({ project, children }: ProjectDetailModalProps) {
  const [open, setOpen] = useState(false);
  const hasImages = project.images && project.images.length > 0;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Plain div trigger — avoids forwardRef requirement of asChild */}
      <div onClick={() => setOpen(true)} className="h-full cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild onOpenAutoFocus={(e) => e.preventDefault()}>
              <motion.div
                className="fixed inset-0 z-50 flex justify-end outline-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="relative h-full w-full sm:max-w-lg bg-[var(--background)] border-l border-[var(--border)] overflow-hidden flex flex-col shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  {/* Close button */}
                  <Dialog.Close className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/30 transition-all">
                    <RiCloseLine size={16} />
                  </Dialog.Close>

                  {/* Scrollable content */}
                  <div className="overflow-y-auto flex-1 h-full">

                    {/* Image gallery — only shown when images are available */}
                    {hasImages && (
                      <div className="w-full aspect-video">
                        <ImageGallery images={project.images!} title={project.title} />
                      </div>
                    )}

                    <div className="p-6 space-y-6">

                      {/* Header: logo + title + links */}
                      <div className="flex items-start gap-4">
                        <ProjectLogo logo={project.logo} title={project.title} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Dialog.Title className="text-xl font-black text-[var(--foreground)] leading-tight">
                                {project.title}
                              </Dialog.Title>
                              <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                                {project.category}
                              </span>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              {project.githubLink && project.githubLink !== "#" && (
                                <a
                                  href={project.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-md bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center text-[var(--secondary)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/30 transition-all"
                                >
                                  <RiGithubFill size={16} />
                                </a>
                              )}
                              {project.link && project.link !== "#" && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-9 h-9 rounded-md bg-[var(--primary)] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                                >
                                  <RiExternalLinkLine size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-3">
                        <p className="text-[var(--foreground)]/70 leading-relaxed text-sm">
                          {project.description}
                        </p>
                        {project.details && (
                          <p className="text-[var(--foreground)]/60 leading-relaxed text-sm">
                            {project.details}
                          </p>
                        )}
                      </div>

                      {/* Features */}
                      {project.features && project.features.length > 0 && (
                        <div>
                          <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--secondary)] mb-3">
                            Features
                          </h4>
                          <ul className="space-y-2">
                            {project.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]/70">
                                <RiCheckLine size={14} className="text-[var(--primary)] mt-0.5 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech stack */}
                      <div>
                        <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--secondary)] mb-3">
                          Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm bg-[var(--muted)] border border-[var(--border)] text-[var(--secondary)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

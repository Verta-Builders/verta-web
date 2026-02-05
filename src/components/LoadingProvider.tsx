"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingContextType = {
    isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

export default function LoadingProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Minimum loading time of 500ms + some buffer for the animation to feel good
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1150); // 0.9s animation + 0.25s pause

        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading }}>
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="loader"
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-dark-950"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div className="relative flex flex-col items-center gap-8">
                            {/* Word: VERTA */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase"
                            >
                                VERTA
                            </motion.h1>

                            {/* Progress Bar Container */}
                            <div className="w-64 h-1 bg-dark-800 rounded-full overflow-hidden">
                                {/* Filling Bar */}
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: 0.9,
                                        ease: "easeInOut",
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </LoadingContext.Provider>
    );
}

'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

export default function WindowManager() {
    const [windows, setWindows] = useState([]);
    const [nextId, setNextId] = useState(1);
    const [dragging, setDragging] = useState(null);
    const [snapPreview, setSnapPreview] = useState(null);
    const [topWindow, setTopWindow] = useState(null);
    const containerRef = useRef(null);

    const createWindow = () => {
        const newWindow = {
            id: nextId,
            x: Math.random() * (window.innerWidth - 400),
            y: Math.random() * (window.innerHeight - 400),
            width: 400,
            height: 400,
            isSnapped: false
        };
        setWindows([...windows, newWindow]);
        setNextId(nextId + 1);
    };

    const closeWindow = (id) => {
        setWindows(windows.filter(w => w.id !== id));
    };

    const handleMouseDown = (e, id) => {
        if (e.target.closest('.close-btn')) return;

        // Bring window to front
        setTopWindow(id);

        const win = windows.find(w => w.id === id);
        const rect = e.currentTarget.getBoundingClientRect();

        setDragging({
            id,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top,
            startX: e.clientX,
            startY: e.clientY
        });
    };

    const getSnapZone = (mouseX, mouseY) => {
        const snapThreshold = 50;
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        if (mouseX <= snapThreshold) {
            return { edge: 'left', x: 0, y: 0, width: containerWidth / 2, height: containerHeight };
        } else if (mouseX >= containerWidth - snapThreshold) {
            return { edge: 'right', x: containerWidth / 2, y: 0, width: containerWidth / 2, height: containerHeight };
        } else if (mouseY <= snapThreshold) {
            return { edge: 'top', x: 0, y: 0, width: containerWidth, height: containerHeight / 2 };
        } else if (mouseY >= containerHeight - snapThreshold) {
            return { edge: 'bottom', x: 0, y: containerHeight / 2, width: containerWidth, height: containerHeight / 2 };
        }

        return null;
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;

            const newX = e.clientX - dragging.offsetX;
            const newY = e.clientY - dragging.offsetY;

            // Update window position
            setWindows(windows.map(w => {
                if (w.id === dragging.id) {
                    return {
                        ...w,
                        x: newX,
                        y: newY,
                        isSnapped: false,
                        width: 400,
                        height: 400
                    };
                }
                return w;
            }));

            // Update snap preview
            const snapZone = getSnapZone(e.clientX, e.clientY);
            setSnapPreview(snapZone);
        };

        const handleMouseUp = (e) => {
            if (!dragging) return;

            const snapZone = getSnapZone(e.clientX, e.clientY);

            if (snapZone) {
                setWindows(windows.map(w => {
                    if (w.id === dragging.id) {
                        return {
                            ...w,
                            x: snapZone.x,
                            y: snapZone.y,
                            width: snapZone.width,
                            height: snapZone.height,
                            isSnapped: true
                        };
                    }
                    return w;
                }));
            }

            setDragging(null);
            setSnapPreview(null);
        };

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, windows]);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
            {/* Snap Preview */}
            {snapPreview && (
                <div
                    className="absolute bg-blue-500/30 backdrop-blur-sm border-4 border-blue-400/50 rounded-lg pointer-events-none z-40 transition-all duration-150"
                    style={{
                        left: `${snapPreview.x}px`,
                        top: `${snapPreview.y}px`,
                        width: `${snapPreview.width}px`,
                        height: `${snapPreview.height}px`
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-white text-2xl font-semibold opacity-70">
                            Release to snap
                        </div>
                    </div>
                </div>
            )}

            {/* Windows */}
            {windows.map((win) => (
                <div
                    key={win.id}
                    className="absolute bg-white rounded-lg shadow-2xl transition-all duration-200 ease-out"
                    style={{
                        left: `${win.x}px`,
                        top: `${win.y}px`,
                        width: `${win.width}px`,
                        height: `${win.height}px`,
                        cursor: dragging?.id === win.id ? 'grabbing' : 'grab',
                        zIndex: topWindow === win.id ? 50 : 10
                    }}
                    onMouseDown={(e) => handleMouseDown(e, win.id)}
                >
                    <div className="h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-between px-4 cursor-grab active:cursor-grabbing">
                        <span className="text-white font-semibold">App {win.id}</span>
                        <button
                            className="close-btn w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                            onClick={() => closeWindow(win.id)}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <div className="p-6 h-[calc(100%-3rem)] overflow-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Window {win.id}</h2>
                        <p className="text-gray-600">
                            Drag this window to any edge of the screen to snap it to half the viewport.
                            You'll see a preview of where the window will snap before you release.
                        </p>
                    </div>
                </div>
            ))}

            {/* Add Button */}
            <button
                onClick={createWindow}
                className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-200 flex items-center justify-center group z-50"
            >
                <Plus className="w-8 h-8 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
        </div>
    );
}
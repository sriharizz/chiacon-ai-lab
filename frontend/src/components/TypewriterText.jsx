import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 15 }) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        setDisplayedText('')
        setCurrentIndex(0)
    }, [text])

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, text, speed])

    return (
        <span>
            {displayedText}
            {currentIndex < text.length && (
                <span className="inline-block w-0.5 h-5 ml-0.5 animate-pulse"
                    style={{ background: 'var(--teal)', verticalAlign: 'text-bottom' }} />
            )}
        </span>
    )
}

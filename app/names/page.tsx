"use client";

import { useState } from "react";
import NameInput from "./NameInput";
import NameList from "./NameList";

// 20 stylish name transformation functions, popular with Indian users
const styles = [
  (txt: string) => txt.toUpperCase(), // UPPERCASE
  (txt: string) => txt.toLowerCase(), // lowercase
  (txt: string) => `★ ${txt} ★`, // Stars
  (txt: string) => `『${txt}』`, // Brackets
  (txt: string) => `꧁${txt}꧂`, // Fancy Brackets
  (txt: string) => `•°${txt}°•`, // Dots
  (txt: string) => `『★${txt}★』`, // Stars in Brackets
  (txt: string) => `✿${txt}✿`, // Flowers
  (txt: string) => `《${txt}》`, // Angle Brackets
  (txt: string) => `❥${txt}❥`, // Hearts
  (txt: string) => txt.split('').join(' '), // Spaced
  (txt: string) => txt.split('').map(c => /[a-z]/i.test(c) ? String.fromCharCode(0x1D5A0 + (c.toLowerCase().charCodeAt(0) - 97)) : c).join(''), // Math Sans Bold
  (txt: string) => txt.split('').map(c => /[a-z]/i.test(c) ? String.fromCharCode(0x1D5D4 + (c.toLowerCase().charCodeAt(0) - 97)) : c).join(''), // Math Sans Italic
  (txt: string) => txt.replace(/[aeiou]/gi, 'ꜰ'), // Replace vowels with 'ꜰ'
  (txt: string) => txt.replace(/./g, c => c + c), // Double letters
  (txt: string) => txt.split('').reverse().join(''), // Reversed
  (txt: string) => `°•¤${txt}¤•°`, // Dots and lines
  (txt: string) => `✧${txt}✧`, // Stars
  (txt: string) => `❦${txt}❦`, // Leaves
  (txt: string) => `✪${txt}✪`, // Star in circle
];

export default function NamesPage() {
  const [input, setInput] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const results = input
    ? styles.map(fn => fn(input))
    : [];

  const handleCopy = (name: string, idx: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const handleClear = () => setInput("");

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gradient-to-b from-background to-background/80 flex flex-col items-center">
      <div className="container px-3 sm:px-4 md:px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center gradient-text">Instagram Stylish Names Generator</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto text-lg">
          Instantly generate stylish, fancy, and unique names for your Instagram profile. Enter your text and explore a variety of cool styles!
        </p>
        <NameInput input={input} setInput={setInput} onClear={handleClear} styleCount={styles.length} />
        <div className="w-full mt-4">
          <NameList results={results} copiedIdx={copiedIdx} handleCopy={handleCopy} />
        </div>
        <section className="w-full max-w-2xl mt-10 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow p-6 border border-purple-200">
          <h2 className="text-2xl font-extrabold mb-4 text-purple-700 flex items-center gap-2">
            <span className="text-purple-400">🌟</span> Sample Styles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(input ? styles.map(fn => fn(input)) : styles.map(fn => fn("Instagram"))).map((styled, idx) => (
              <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg text-lg font-mono select-all shadow-sm flex items-center gap-2">
                {styled}
              </div>
            ))}
          </div>
        </section>
        <section className="w-full max-w-2xl mt-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow p-6 border border-blue-200">
          <h2 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2">
            <span className="text-blue-400">📝</span> How to Use
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-base pl-2">
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">1.</span> <span>Enter your name or any text in the input box above.</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">2.</span> <span>Browse through the generated stylish versions below.</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">3.</span> <span>Click <span className="font-semibold text-purple-600">Copy</span> to copy your favorite style to the clipboard.</span></li>
            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">4.</span> <span>Use the <span className="font-semibold text-purple-600">Clear</span> button to reset and try new text.</span></li>
          </ol>
        </section>
        <section className="w-full max-w-2xl mt-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow p-6 border border-purple-200">
          <h2 className="text-xl font-bold mb-4 text-purple-700 flex items-center gap-2">
            <span className="text-purple-400">❓</span> FAQ
          </h2>
          <div className="space-y-5 divide-y divide-purple-100">
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-500">💡</span>
                <strong className="text-blue-700">Is this generator free to use?</strong>
              </div>
              <p className="text-gray-700 ml-7">Yes! You can generate as many stylish names as you like, completely free.</p>
            </div>
            <div className="py-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-500">🌐</span>
                <strong className="text-blue-700">Can I use these names on other platforms?</strong>
              </div>
              <p className="text-gray-700 ml-7">Absolutely. These styles work on Instagram, Facebook, Twitter, and more.</p>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-500">🧐</span>
                <strong className="text-blue-700">Why do some styles look strange?</strong>
              </div>
              <p className="text-gray-700 ml-7">Some styles use special Unicode characters that may not display on all devices or platforms.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
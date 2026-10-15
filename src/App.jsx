import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen, Coffee, TrainFront, Scale,
  Sparkles, Layers, Cpu, Volume2, VolumeX,
  Play, Pause, SkipForward, SkipBack, RotateCcw, Terminal,
  Activity, Zap, Code2, Copy, Check, ArrowRight, Shuffle,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';

/* ==========================================================================
   WEB AUDIO API SYNTHESIZER (100% Client-Side Sound Engine)
   ========================================================================== */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playThud() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (e) {}
  }

  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.09);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playDing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (e) {}
  }

  playFlick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch (e) {}
  }

  playCacheMiss() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(155, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.0, 523.25];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.09 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.28);
      });
    } catch (e) {}
  }
}

const sfx = new SoundEngine();

/* ==========================================================================
   SORTING SNAPSHOT GENERATOR ENGINE
   ========================================================================== */
function generateSortSnapshots(algo, initialArr) {
  const arr = [...initialArr];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  const snap = (comparing = [], swapping = [], sorted = [], pivot = null, line = 0, msg = '') => {
    steps.push({
      array: [...arr],
      comparing: [...comparing],
      swapping: [...swapping],
      sorted: [...sorted],
      pivot,
      line,
      msg,
      comparisons,
      swaps
    });
  };

  snap([], [], [], null, 0, 'Initial unsorted state ready for execution.');

  if (algo === 'bubble') {
    const n = arr.length;
    const sorted = [];
    for (let i = 0; i < n - 1; i++) {
      let didSwap = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        snap([j, j + 1], [], sorted, null, 3, `Comparing Bubble [${arr[j]}] at index ${j} with Bubble [${arr[j + 1]}] at index ${j + 1}.`);
        if (arr[j] > arr[j + 1]) {
          swaps++;
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          didSwap = true;
          snap([], [j, j + 1], sorted, null, 4, `Buoyancy swap! Larger bubble [${arr[j + 1]}] floats past [${arr[j]}].`);
        }
      }
      sorted.push(n - 1 - i);
      if (!didSwap) break;
    }
    const allSorted = arr.map((_, idx) => idx);
    snap([], [], allSorted, null, 7, 'Bubble Sort complete! All bubbles in buoyant equilibrium.');
  } else if (algo === 'insertion') {
    const n = arr.length;
    const sorted = [0];
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      snap([i], [], sorted, i, 2, `Picked up Key Card [${key}] from position ${i}.`);
      while (j >= 0) {
        comparisons++;
        snap([j, j + 1], [], sorted, j + 1, 4, `Comparing Key Card [${key}] against card [${arr[j]}] in hand.`);
        if (arr[j] > key) {
          swaps++;
          arr[j + 1] = arr[j];
          snap([], [j, j + 1], sorted, j, 5, `Card [${arr[j]}] > [${key}]: sliding [${arr[j]}] one slot right.`);
          j--;
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      if (!sorted.includes(i)) sorted.push(i);
      snap([], [j + 1], sorted, null, 8, `Inserted Key Card [${key}] neatly at slot ${j + 1}.`);
    }
    snap([], [], arr.map((_, idx) => idx), null, 9, 'Insertion Sort complete! Hand of cards is fully ordered.');
  } else if (algo === 'selection') {
    const n = arr.length;
    const sorted = [];
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      snap([i], [], sorted, minIdx, 2, `Scanner arm initialized minimum apple at index ${i} (size ${arr[i]}).`);
      for (let j = i + 1; j < n; j++) {
        comparisons++;
        snap([j], [], sorted, minIdx, 4, `Laser scanner inspecting apple [${arr[j]}] vs current min [${arr[minIdx]}].`);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          snap([j], [], sorted, minIdx, 5, `New smallest apple [${arr[minIdx]}] locked at position ${minIdx}!`);
        }
      }
      if (minIdx !== i) {
        swaps++;
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        snap([], [i, minIdx], sorted, null, 7, `Mechanical claw swapped smallest apple [${arr[i]}] into front crate ${i}.`);
      }
      sorted.push(i);
    }
    sorted.push(n - 1);
    snap([], [], sorted, null, 8, 'Selection Sort complete! Minimum O(n) swaps achieved.');
  } else if (algo === 'quick') {
    const sorted = [];
    const partition = (low, high) => {
      const pivotVal = arr[high];
      let i = low - 1;
      snap([], [], sorted, high, 2, `Selected suitcase [${pivotVal}] at index ${high} as the Pivot Gatekeeper.`);
      for (let j = low; j < high; j++) {
        comparisons++;
        snap([j], [], sorted, high, 4, `Weighing suitcase [${arr[j]}] against Pivot [${pivotVal}].`);
        if (arr[j] < pivotVal) {
          i++;
          if (i !== j) {
            swaps++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            snap([], [i, j], sorted, high, 5, `Lighter suitcase [${arr[i]}] routed to Left Carry-On belt (index ${i}).`);
          }
        }
      }
      swaps++;
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      sorted.push(i + 1);
      snap([], [i + 1, high], sorted, i + 1, 7, `Pivot suitcase [${pivotVal}] locked into its final sorted position ${i + 1}.`);
      return i + 1;
    };
    const qSort = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        qSort(low, pi - 1);
        qSort(pi + 1, high);
      } else if (low === high && !sorted.includes(low)) {
        sorted.push(low);
      }
    };
    qSort(0, arr.length - 1);
    snap([], [], arr.map((_, idx) => idx), null, 8, 'Quick Sort complete! All luggage partitioned in O(n log n) average time.');
  } else if (algo === 'merge') {
    const sorted = [];
    const merge = (l, m, r) => {
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      snap([], [], sorted, m, 4, `Zipper-merging left conveyor [${l}..${m}] and right conveyor [${m + 1}..${r}].`);
      while (i < left.length && j < right.length) {
        comparisons++;
        snap([l + i, m + 1 + j], [], sorted, null, 5, `Comparing lead parcels: [${left[i]}] vs [${right[j]}].`);
        if (left[i] <= right[j]) {
          swaps++;
          arr[k] = left[i];
          snap([], [k], sorted, null, 6, `Zipper fed parcel [${left[i]}] into main chute slot ${k}.`);
          i++;
        } else {
          swaps++;
          arr[k] = right[j];
          snap([], [k], sorted, null, 7, `Zipper fed parcel [${right[j]}] into main chute slot ${k}.`);
          j++;
        }
        k++;
      }
      while (i < left.length) {
        swaps++;
        arr[k] = left[i];
        snap([], [k], sorted, null, 8, `Flushing remaining left parcel [${left[i]}] to slot ${k}.`);
        i++;
        k++;
      }
      while (j < right.length) {
        swaps++;
        arr[k] = right[j];
        snap([], [k], sorted, null, 8, `Flushing remaining right parcel [${right[j]}] to slot ${k}.`);
        j++;
        k++;
      }
    };
    const mSort = (l, r) => {
      if (l >= r) return;
      const m = Math.floor((l + r) / 2);
      mSort(l, m);
      mSort(m + 1, r);
      merge(l, m, r);
    };
    mSort(0, arr.length - 1);
    snap([], [], arr.map((_, idx) => idx), null, 9, 'Merge Sort complete! Guaranteed O(n log n) stable order.');
  }

  return steps;
}

const SORT_META = {
  bubble: {
    title: 'Bubble Sort — Buoyant Water Chamber',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    code: [
      'function bubbleSort(tank) {',
      '  for (let i = 0; i < n - 1; i++) {',
      '    for (let j = 0; j < n - i - 1; j++) {',
      '      if (tank[j] > tank[j + 1]) { // Compare adjacent bubbles',
      '        swap(tank, j, j + 1);      // Larger bubble floats right',
      '      }',
      '    }',
      '  }',
      '}'
    ]
  },
  insertion: {
    title: 'Insertion Sort — Playing Cards in Hand',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    code: [
      'function insertionSort(hand) {',
      '  for (let i = 1; i < hand.length; i++) {',
      '    let keyCard = hand[i]; // Lift card from unsorted deck',
      '    let j = i - 1;',
      '    while (j >= 0 && hand[j] > keyCard) {',
      '      hand[j + 1] = hand[j]; // Slide larger card right',
      '      j--;',
      '    }',
      '    hand[j + 1] = keyCard; // Drop key card into sorted slot',
      '  }',
      '}'
    ]
  },
  selection: {
    title: 'Selection Sort — Optical Apple Size Grader',
    best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    code: [
      'function selectionSort(conveyor) {',
      '  for (let i = 0; i < n - 1; i++) {',
      '    let minIdx = i; // Lock initial minimum apple',
      '    for (let j = i + 1; j < n; j++) {',
      '      if (conveyor[j] < conveyor[minIdx])',
      '        minIdx = j; // Laser updates smallest apple',
      '    }',
      '    swap(conveyor, i, minIdx); // Claw swaps to front crate',
      '  }',
      '}'
    ]
  },
  quick: {
    title: 'Quick Sort — Airport Baggage Pivot Sizer',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)',
    code: [
      'function quickSort(luggage, low, high) {',
      '  if (low < high) {',
      '    let pivot = luggage[high]; // Gatekeeper suitcase',
      '    // Route lighter bags left, heavier bags right',
      '    let p = partition(luggage, low, high);',
      '    quickSort(luggage, low, p - 1);',
      '    quickSort(luggage, p + 1, high);',
      '  }',
      '}'
    ]
  },
  merge: {
    title: 'Merge Sort — Logistics Zipper Conveyor',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',
    code: [
      'function mergeSort(parcels, l, r) {',
      '  if (l >= r) return;',
      '  let mid = Math.floor((l + r) / 2);',
      '  mergeSort(parcels, l, mid);',
      '  mergeSort(parcels, mid + 1, r);',
      '  // Zipper-merge two sorted conveyor lanes',
      '  zipperMerge(parcels, l, mid, r);',
      '}'
    ]
  }
};

/* ==========================================================================
   MASTER GEMINI PROMPT TEXT
   ========================================================================== */
const GEMINI_MASTER_PROMPT = `Role: Act as a Principal Frontend Architect and Award-Winning Interactive UI/UX Designer (10+ years experience building Brilliant.org, Linear, and Apple Developer-grade educational web applications).

Task: Build "AlgoVista", an interactive, production-grade Data Structures, Algorithms & Systems Architecture Web Application in React (TypeScript/JSX), Tailwind CSS, Lucide Icons, Recharts, and HTML5 SVG/Canvas.

1. VISUAL & AESTHETIC DIRECTION:
- Theme: Deep Obsidian & Slate Dark Mode (#070b14 canvas, #0f172a glassmorphic cards, 1px translucent borders, ambient cyan/indigo/violet radial backlights).
- Original Vibrant Illustrations: Preserve 100% full-saturation, vibrant colors inside every interactive vector diagram so the real-world metaphors pop with crystal clarity against the dark UI shell.
- Typography: Inter for UI controls and JetBrains Mono for memory addresses, complexity badges, and synchronized code stepping.

2. CORE PILLAR 1 — 7 INTERACTIVE REAL-LIFE DATA STRUCTURES:
- STACK (LIFO): Stacked colorful hardbound books (Purple, Sky Blue, Teal, Emerald, Royal Blue) on a warm 3D wooden study desk with a glowing brass desk lamp and potted plant. Animate books dropping onto TOP (Push), sliding off (Pop), lifting with a cyan glow (Peek), and Stack Overflow/Underflow alerts.
- QUEUE (FIFO): Warm Coffee Shop counter with barista, espresso machine, stanchion rope, and colorful customers (blue shirt with backpack, yellow sweater, green hoodie, purple jacket). Clearly label FRONT (Dequeue/Served first) and REAR (Enqueue/Join back).
- LINKED LIST: Royal-blue passenger train carriages on railroad tracks ([10] -> [20] -> [30] -> [40] -> [NULL]) with animated "Next" pointer couplers. Support Head/Tail/Index insertion, node uncoupling, pointer reversal, and linear traversal.
- BINARY SEARCH TREE: Organic botanical tree with brown trunk, lush green leaf clusters, and glowing numbered circular fruit nodes (Root 10, Parents 5 & 15, Leaves 3, 7, 12, 18) with hierarchy brackets. Support custom insertion, search, and animated In-Order, Pre-Order, Post-Order, and BFS traversals.
- SELF-BALANCING AVL TREE: Interactive LL (Right Rotate), RR (Left Rotate), LR, and RL rotation visualizer displaying live Balance Factors (BF = H_left - H_right).
- GRAPH (CITY MAP): Dark-mode city map connecting Library, Museum, City Center, Park, Station, Hospital, and Airport. Support custom Start/Target selection and animate Dijkstra's Shortest Path & BFS with glowing cyan route edges.
- ARRAY (PARKING LOT): Top-down numbered asphalt parking bays [0..6] with vibrant multi-colored sports cars (slot 3 highlighted in neon purple/cyan). Contrast O(1) direct index lookup against O(n) insertion/deletion car shifting.

3. CORE PILLAR 2 — PHYSICAL SORTING & DUEL LABORATORY:
- Deterministic Snapshot Playback Engine supporting Play/Pause, Step Forward, Step Backward, Timeline Scrubber, and Speed Control (0.5x to 4x) across:
  * Bubble Sort: Translucent rising water bubbles in an aquarium chamber.
  * Insertion Sort: Playing cards in hand lifting key cards and shifting sorted cards.
  * Selection Sort: Optical laser scanner claw grading red/gold/green apples on a belt.
  * Quick Sort: Airport baggage sizer partitioning suitcases around a Pivot gatekeeper.
  * Merge Sort: Logistics parcels splitting and zipper-merging across dual conveyors.
  * Algorithm Race Duel: Split-screen synchronous race between any two algorithms with live Recharts telemetry graphs.

4. CORE PILLAR 3 — HARDWARE & SYSTEMS ARCHITECTURE:
- CPU Cache Hierarchy Simulator: 64-byte L1 Cache Line (8 blocks) demonstrating Spatial Locality (87.5% Cache Hit rate for contiguous Arrays at ~1 cycle) vs Pointer Chasing (0% Hit rate for scattered Heap Linked Lists at ~20 cycles).
- Virtual Memory & x86-64 Call Stack Inspector: Visualize RSP/RBP stack frame allocations growing downward vs Heap allocations growing upward, including SIGSEGV Stack Overflow simulation.

5. CLIENT-SIDE WEB AUDIO SYNTHESIZER:
- Use native browser AudioContext oscillators (zero external audio files) to synthesize book thuds, coffee shop service bells, bubble pops, card flicks, train clicks, cache hit/miss tones, and victory fanfare, with a master Mute/Unmute toggle.`;

/* ==========================================================================
   MAIN REACT APPLICATION COMPONENT
   ========================================================================== */
export default function App() {
  const [activeSection, setActiveSection] = useState('atlas');
  const [activeDS, setActiveDS] = useState('stack');
  const [activeAlgo, setActiveAlgo] = useState('bubble');
  const [activeSys, setActiveSys] = useState('cache');
  const [soundOn, setSoundOn] = useState(true);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Shared Telemetry & Code Sync State
  const [telemetry, setTelemetry] = useState({
    label1: 'Comparisons', val1: '0',
    label2: 'Swaps / Writes', val2: '5',
    label3: 'Structure Size', val3: '5 / 7',
    status: 'Ready'
  });
  const [complexity, setComplexity] = useState({
    best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(n)'
  });
  const [codeLines, setCodeLines] = useState([
    'class BookStack {',
    '  push(bookTitle) {',
    '    if (this.top >= MAX) throw StackOverflow();',
    '    this.desk[++this.top] = bookTitle; // O(1)',
    '  }',
    '  pop() {',
    '    if (this.top < 0) throw StackUnderflow();',
    '    return this.desk[this.top--];      // O(1)',
    '  }',
    '  peek() { return this.desk[this.top]; }',
    '}'
  ]);
  const [activeCodeLine, setActiveCodeLine] = useState(3);
  const [logMsg, setLogMsg] = useState('Interactive Real-Life DSA & Systems Laboratory ready. Choose any module or click a card to begin.');

  // ----------------- 1. STACK STATE (Books on Desk) -----------------
  const bookPalette = [
    { bg: '#1d4ed8', spine: '#1e40af', border: '#60a5fa' },
    { bg: '#15803d', spine: '#166534', border: '#4ade80' },
    { bg: '#0e7490', spine: '#155e75', border: '#22d3ee' },
    { bg: '#0284c7', spine: '#0369a1', border: '#38bdf8' },
    { bg: '#7c3aed', spine: '#5b21b6', border: '#a78bfa' },
    { bg: '#db2777', spine: '#9d174d', border: '#f472b6' },
    { bg: '#d97706', spine: '#92400e', border: '#fbbf24' }
  ];
  const [books, setBooks] = useState(['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5']);
  const [bookInput, setBookInput] = useState('Book 6');
  const [peekBookIdx, setPeekBookIdx] = useState(-1);

  // ----------------- 2. QUEUE STATE (Coffee Shop) -----------------
  const customerPalette = [
    { shirt: '#2563eb', hair: '#0f172a', bag: '#1e293b' },
    { shirt: '#eab308', hair: '#78350f', bag: null },
    { shirt: '#10b981', hair: '#111827', bag: null },
    { shirt: '#9333ea', hair: '#1e1b4b', bag: null },
    { shirt: '#3b82f6', hair: '#0f172a', bag: '#334155' },
    { shirt: '#f43f5e', hair: '#451a03', bag: null }
  ];
  const [queueLine, setQueueLine] = useState([
    { id: 1, name: 'Alex', drink: 'Espresso', style: 0 },
    { id: 2, name: 'Maya', drink: 'Latte', style: 1 },
    { id: 3, name: 'Liam', drink: 'Cold Brew', style: 2 },
    { id: 4, name: 'Sara', drink: 'Cappuccino', style: 3 },
    { id: 5, name: 'Noah', drink: 'Mocha', style: 4 }
  ]);
  const [queueNameInput, setQueueNameInput] = useState('Elena');
  const [servedCustomer, setServedCustomer] = useState(null);

  // ----------------- 3. LINKED LIST STATE (Blue Train) -----------------
  const [trainCars, setTrainCars] = useState([
    { id: 'c1', val: 10, addr: '0x10A0' },
    { id: 'c2', val: 20, addr: '0x24F0' },
    { id: 'c3', val: 30, addr: '0x3B80' },
    { id: 'c4', val: 40, addr: '0x59C0' }
  ]);
  const [trainInputVal, setTrainInputVal] = useState('50');
  const [activeCarIdx, setActiveCarIdx] = useState(-1);

  // ----------------- 4. TREE STATE (Botanical Tree) -----------------
  const [visitedTreeVals, setVisitedTreeVals] = useState([]);
  const [activeTreeVal, setActiveTreeVal] = useState(null);
  const [traversalOrderText, setTraversalOrderText] = useState('Click any traversal button to animate firefly path');

  // ----------------- 5. AVL TREE STATE -----------------
  const [avlMode, setAvlMode] = useState('balanced');

  // ----------------- 6. GRAPH STATE (City Map) -----------------
  const [graphStart, setGraphStart] = useState('library');
  const [graphEnd, setGraphEnd] = useState('airport');
  const [activeGraphNodes, setActiveGraphNodes] = useState(['library', 'center', 'station', 'airport']);
  const [activeGraphEdges, setActiveGraphEdges] = useState(['library-center', 'center-station', 'station-airport']);

  // ----------------- 7. ARRAY STATE (Parking Lot) -----------------
  const initialCars = [
    { slot: 0, plate: 'DSA-10', color: '#2563eb', name: 'Blue GT' },
    { slot: 1, plate: 'DSA-20', color: '#dc2626', name: 'Red Coupe' },
    { slot: 2, plate: 'DSA-30', color: '#16a34a', name: 'Green EV' },
    { slot: 3, plate: 'DSA-40', color: '#9333ea', name: 'Purple Spyder' },
    { slot: 4, plate: 'DSA-50', color: '#eab308', name: 'Gold Turbo' },
    { slot: 5, plate: 'DSA-60', color: '#0891b2', name: 'Cyan Sedan' },
    { slot: 6, plate: 'DSA-70', color: '#334155', name: 'Stealth Black' }
  ];
  const [parkingCars, setParkingCars] = useState(initialCars);
  const [selectedBay, setSelectedBay] = useState(3);
  const [arrayShiftIdx, setArrayShiftIdx] = useState('2');

  // ----------------- 8. SORTING STATE -----------------
  const [sortRawArr, setSortRawArr] = useState([64, 28, 86, 42, 16, 74, 35, 53]);
  const [sortStepIdx, setSortStepIdx] = useState(0);
  const [isSortPlaying, setIsSortPlaying] = useState(false);

  const sortSnapshots = useMemo(() => {
    return generateSortSnapshots(activeAlgo === 'race' ? 'quick' : activeAlgo, sortRawArr);
  }, [activeAlgo, sortRawArr]);

  const currentSortSnap = sortSnapshots[Math.min(sortStepIdx, sortSnapshots.length - 1)] || sortSnapshots[0];

  // ----------------- 9. RACE DUEL STATE -----------------
  const [raceAlgoA, setRaceAlgoA] = useState('quick');
  const [raceAlgoB, setRaceAlgoB] = useState('bubble');
  const [raceArr, setRaceArr] = useState([78, 22, 91, 34, 65, 14, 83, 47, 19, 56]);
  const [raceStep, setRaceStep] = useState(0);
  const [isRacing, setIsRacing] = useState(false);

  const raceSnapsA = useMemo(() => generateSortSnapshots(raceAlgoA, raceArr), [raceAlgoA, raceArr]);
  const raceSnapsB = useMemo(() => generateSortSnapshots(raceAlgoB, raceArr), [raceAlgoB, raceArr]);

  // ----------------- 10. HARDWARE CACHE & STACK MEMORY STATE -----------------
  const [cacheBlocks, setCacheBlocks] = useState(
    Array.from({ length: 8 }, (_, i) => ({ idx: i, offset: `0x10${i * 8}`, val: (i + 1) * 12, status: 'idle' }))
  );
  const [cacheStats, setCacheStats] = useState({ hits: 7, misses: 1, cycles: 27, mode: 'Array (Spatial Locality)' });
  const [callFrames, setCallFrames] = useState([
    { fn: 'main()', rsp: '0x7FFF_DE40', vars: 'argc=1, argv=0x7fffee00', status: 'base' },
    { fn: 'quickSort(arr, 0, 7)', rsp: '0x7FFF_DE10', vars: 'low=0, high=7, pivot=53', status: 'saved' },
    { fn: 'partition(arr, 0, 7)', rsp: '0x7FFF_DDE0', vars: 'i=2, j=5, pivotVal=53', status: 'active' }
  ]);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sfx.enabled = next;
    if (next) sfx.playDing();
  };

  const handleCopyPrompt = () => {
    try {
      const ta = document.createElement('textarea');
      ta.value = GEMINI_MASTER_PROMPT;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedPrompt(true);
      sfx.playDing();
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch (e) {}
  };

  useEffect(() => {
    if (!isSortPlaying) return;
    const timer = setInterval(() => {
      setSortStepIdx((prev) => {
        if (prev < sortSnapshots.length - 1) {
          const nextSnap = sortSnapshots[prev + 1];
          if (nextSnap.swapping.length > 0) sfx.playPop();
          else sfx.playFlick();
          setActiveCodeLine(nextSnap.line);
          setLogMsg(nextSnap.msg);
          setTelemetry({
            label1: 'Comparisons', val1: String(nextSnap.comparisons),
            label2: 'Swaps / Shifts', val2: String(nextSnap.swaps),
            label3: 'Step Progress', val3: `${prev + 2} / ${sortSnapshots.length}`,
            status: prev + 2 === sortSnapshots.length ? 'Sorted' : 'Running'
          });
          return prev + 1;
        } else {
          setIsSortPlaying(false);
          sfx.playFanfare();
          return prev;
        }
      });
    }, 360);
    return () => clearInterval(timer);
  }, [isSortPlaying, sortSnapshots]);

  useEffect(() => {
    if (!isRacing) return;
    const maxLen = Math.max(raceSnapsA.length, raceSnapsB.length);
    const timer = setInterval(() => {
      setRaceStep((prev) => {
        if (prev < maxLen - 1) {
          if (prev % 2 === 0) sfx.playFlick();
          return prev + 1;
        } else {
          setIsRacing(false);
          sfx.playFanfare();
          return prev;
        }
      });
    }, 180);
    return () => clearInterval(timer);
  }, [isRacing, raceSnapsA, raceSnapsB]);

  useEffect(() => {
    setIsSortPlaying(false);
    setIsRacing(false);
    if (activeSection === 'ds') {
      if (activeDS === 'stack') {
        setComplexity({ best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(n)' });
        setCodeLines([
          'class BookStack {',
          '  push(bookTitle) {',
          '    if (this.top >= MAX) throw StackOverflow();',
          '    this.desk[++this.top] = bookTitle; // O(1) Top Insert',
          '  }',
          '  pop() {',
          '    if (this.top < 0) throw StackUnderflow();',
          '    return this.desk[this.top--];      // O(1) Top Remove',
          '  }',
          '  peek() { return this.desk[this.top]; }',
          '}'
        ]);
        setTelemetry({
          label1: 'Top Index', val1: String(books.length - 1),
          label2: 'Books Stacked', val2: String(books.length),
          label3: 'Capacity', val3: `${books.length} / 7`,
          status: 'LIFO Ready'
        });
        setLogMsg('STACK (LIFO): Only add or remove books from the TOP of the study desk.');
      } else if (activeDS === 'queue') {
        setComplexity({ best: 'O(1)', avg: 'O(1)', worst: 'O(1)', space: 'O(n)' });
        setCodeLines([
          'class CoffeeQueue {',
          '  enqueue(customer) {',
          '    this.line.push(customer); // Join at REAR — O(1)',
          '  }',
          '  dequeue() {',
          '    if (this.line.length === 0) return Underflow;',
          '    return this.line.shift(); // Served at FRONT — O(1)',
          '  }',
          '}'
        ]);
        setTelemetry({
          label1: 'Front Customer', val1: queueLine[0]?.name || 'None',
          label2: 'Rear Customer', val2: queueLine[queueLine.length - 1]?.name || 'None',
          label3: 'Queue Length', val3: `${queueLine.length} People`,
          status: 'FIFO Active'
        });
        setLogMsg('QUEUE (FIFO): First customer in line at FRONT is served first; new customers join at REAR.');
      } else if (activeDS === 'linkedlist') {
        setComplexity({ best: 'O(1) Head', avg: 'O(n) Search', worst: 'O(n)', space: 'O(n)' });
        setCodeLines([
          'class TrainNode {',
          '  constructor(data, nextAddr = null) {',
          '    this.data = data; // Carriage payload',
          '    this.next = nextAddr; // Coupler pointer',
          '  }',
          '}',
          'function coupleAtIndex(head, val, idx) {',
          '  let prev = traverseTo(head, idx - 1);',
          '  newNode.next = prev.next; prev.next = newNode;',
          '}'
        ]);
        setTelemetry({
          label1: 'Head Node', val1: trainCars[0] ? `${trainCars[0].val} (${trainCars[0].addr})` : 'NULL',
          label2: 'Tail Pointer', val2: '-> NULL',
          label3: 'Carriages', val3: `${trainCars.length} Linked`,
          status: 'Coupled'
        });
        setLogMsg('LINKED LIST: Each train carriage stores data + a coupler reference (Next pointer) to the next carriage.');
      } else if (activeDS === 'tree') {
        setComplexity({ best: 'O(log n)', avg: 'O(log n)', worst: 'O(n) Skewed', space: 'O(n)' });
        setCodeLines([
          'function traverseTree(node, order) {',
          '  if (node === null) return;',
          '  if (order === "PRE") visit(node.val);',
          '  traverseTree(node.left, order);  // Left branch',
          '  if (order === "IN") visit(node.val);',
          '  traverseTree(node.right, order); // Right branch',
          '  if (order === "POST") visit(node.val);',
          '}'
        ]);
        setTelemetry({
          label1: 'Root Value', val1: '10',
          label2: 'Tree Height', val2: '3 Levels',
          label3: 'Total Nodes', val3: '7 Fruits',
          status: 'Hierarchical'
        });
        setLogMsg('TREE: Hierarchical structure with a Root node (10), Parent branches (5, 15), and Leaf nodes.');
      } else if (activeDS === 'avl') {
        setComplexity({ best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n) Strict', space: 'O(n)' });
        setCodeLines([
          '// AVL Self-Balancing Rotation Engine',
          'int balanceFactor = height(N->left) - height(N->right);',
          'if (balanceFactor > 1 && key < N->left->key)',
          '  return rightRotate(N); // Left-Left Case',
          'if (balanceFactor < -1 && key > N->right->key)',
          '  return leftRotate(N);  // Right-Right Case'
        ]);
      } else if (activeDS === 'graph') {
        setComplexity({ best: 'O(V + E)', avg: 'O(E log V)', worst: 'O(E log V)', space: 'O(V)' });
        setCodeLines([
          'function dijkstraCityGPS(map, source, target) {',
          '  dist[source] = 0; pq.push({ node: source, d: 0 });',
          '  while (!pq.empty()) {',
          '    let u = pq.popMin();',
          '    for (let edge of map.roads[u]) {',
          '      if (dist[u] + edge.km < dist[edge.to]) {',
          '        dist[edge.to] = dist[u] + edge.km;',
          '      }',
          '    }',
          '  }',
          '}'
        ]);
        setLogMsg('GRAPH: A network of city landmark vertices connected by weighted road edges.');
      } else if (activeDS === 'array') {
        setComplexity({ best: 'O(1) Access', avg: 'O(n) Shift', worst: 'O(n) Shift', space: 'O(n)' });
        setCodeLines([
          '// Contiguous Parking Lot Memory Allocation',
          'Car getCarAtIndex(int index) {',
          '  // Instant O(1) address arithmetic:',
          '  return *(baseAddress + index * sizeof(Car));',
          '}',
          'void insertAtBay(int idx, Car newCar) {',
          '  for (int i = N - 1; i >= idx; i--)',
          '    bay[i + 1] = bay[i]; // O(n) contiguous right shift',
          '  bay[idx] = newCar;',
          '}'
        ]);
        setTelemetry({
          label1: 'Selected Bay', val1: `Index [${selectedBay}]`,
          label2: 'Memory Offset', val2: `0x2000 + ${selectedBay * 8}B`,
          label3: 'Lookup Time', val3: 'O(1) Instant',
          status: 'Contiguous'
        });
        setLogMsg('ARRAY: Elements are stored in contiguous numbered parking slots [0..6] for instant O(1) index access.');
      }
    } else if (activeSection === 'algo' && activeAlgo !== 'race') {
      const meta = SORT_META[activeAlgo];
      if (meta) {
        setComplexity({ best: meta.best, avg: meta.avg, worst: meta.worst, space: meta.space });
        setCodeLines(meta.code);
        setSortStepIdx(0);
        setLogMsg(`${meta.title}: Press Play or Step Forward to inspect every comparison and swap.`);
      }
    }
  }, [activeSection, activeDS, activeAlgo]);

  // STACK HANDLERS
  const handlePushBook = () => {
    if (books.length >= 7) {
      sfx.playCacheMiss();
      setLogMsg('⚠️ STACK OVERFLOW! Desk capacity (7 books) reached. Pop a book first.');
      setActiveCodeLine(2);
      return;
    }
    const title = bookInput.trim() || `Book ${books.length + 1}`;
    const next = [...books, title];
    setBooks(next);
    setPeekBookIdx(-1);
    sfx.playThud();
    setActiveCodeLine(3);
    setBookInput(`Book ${next.length + 1}`);
    setTelemetry({
      label1: 'Top Index', val1: String(next.length - 1),
      label2: 'Books Stacked', val2: String(next.length),
      label3: 'Capacity', val3: `${next.length} / 7`,
      status: 'Pushed O(1)'
    });
    setLogMsg(`✅ Pushed "${title}" onto TOP of the book stack (Index ${next.length - 1}).`);
  };

  const handlePopBook = () => {
    if (books.length === 0) {
      sfx.playCacheMiss();
      setLogMsg('⚠️ STACK UNDERFLOW! No books left on the study desk.');
      setActiveCodeLine(6);
      return;
    }
    const popped = books[books.length - 1];
    const next = books.slice(0, -1);
    setBooks(next);
    setPeekBookIdx(-1);
    sfx.playPop();
    setActiveCodeLine(7);
    setBookInput(`Book ${next.length + 1}`);
    setTelemetry({
      label1: 'Top Index', val1: String(next.length - 1),
      label2: 'Books Stacked', val2: String(next.length),
      label3: 'Capacity', val3: `${next.length} / 7`,
      status: 'Popped O(1)'
    });
    setLogMsg(`📤 Popped "${popped}" from TOP of the stack (Last-In, First-Out).`);
  };

  const handlePeekBook = () => {
    if (books.length === 0) return;
    setPeekBookIdx(books.length - 1);
    sfx.playDing();
    setActiveCodeLine(9);
    setLogMsg(`👁️ Peeked at TOP book: "${books[books.length - 1]}" at index ${books.length - 1} without removing it.`);
  };

  // QUEUE HANDLERS
  const handleEnqueuePerson = () => {
    if (queueLine.length >= 6) {
      sfx.playCacheMiss();
      setLogMsg('⚠️ Coffee shop queue is full (6 customers max)!');
      return;
    }
    const drinks = ['Flat White', 'Iced Matcha', 'Americano', 'Macchiato', 'Cortado'];
    const name = queueNameInput.trim() || `Guest ${queueLine.length + 1}`;
    const newPerson = {
      id: Date.now(),
      name,
      drink: drinks[queueLine.length % drinks.length],
      style: queueLine.length % customerPalette.length
    };
    const next = [...queueLine, newPerson];
    setQueueLine(next);
    sfx.playFlick();
    setActiveCodeLine(2);
    const nextNames = ['Zoe', 'Lucas', 'Aria', 'Kai', 'Chloe', 'Leo'];
    setQueueNameInput(nextNames[Math.floor(Math.random() * nextNames.length)]);
    setTelemetry({
      label1: 'Front Customer', val1: next[0]?.name || 'None',
      label2: 'Rear Customer', val2: newPerson.name,
      label3: 'Queue Length', val3: `${next.length} People`,
      status: 'Enqueued O(1)'
    });
    setLogMsg(`🚶 "${name}" joined the REAR of the coffee shop line to order a ${newPerson.drink}.`);
  };

  const handleDequeuePerson = () => {
    if (queueLine.length === 0) {
      sfx.playCacheMiss();
      setLogMsg('⚠️ QUEUE UNDERFLOW! No customers waiting at the counter.');
      setActiveCodeLine(5);
      return;
    }
    const served = queueLine[0];
    const next = queueLine.slice(1);
    setServedCustomer(served);
    setQueueLine(next);
    sfx.playDing();
    setActiveCodeLine(6);
    setTelemetry({
      label1: 'Front Customer', val1: next[0]?.name || 'None',
      label2: 'Rear Customer', val2: next[next.length - 1]?.name || 'None',
      label3: 'Queue Length', val3: `${next.length} People`,
      status: 'Served O(1)'
    });
    setLogMsg(`☕ Served ${served.drink} to "${served.name}" at the FRONT counter! (First-In, First-Out).`);
    setTimeout(() => setServedCustomer(null), 1800);
  };

  // LINKED LIST HANDLERS
  const randomHexAddr = () => `0x${Math.floor(Math.random() * 0x8fff + 0x1000).toString(16).toUpperCase()}`;

  const handleTrainPrepend = () => {
    if (trainCars.length >= 6) return;
    const val = parseInt(trainInputVal, 10) || 5;
    const next = [{ id: `c_${Date.now()}`, val, addr: randomHexAddr() }, ...trainCars];
    setTrainCars(next);
    sfx.playThud();
    setActiveCodeLine(7);
    setTrainInputVal(String(val + 10));
    setLogMsg(`🚂 Coupled new carriage [${val}] at HEAD in O(1) time. Engine now points to [${val}].`);
  };

  const handleTrainAppend = () => {
    if (trainCars.length >= 6) {
      setLogMsg('⚠️ Track limit (6 carriages) reached for viewport clarity.');
      return;
    }
    const val = parseInt(trainInputVal, 10) || 50;
    const next = [...trainCars, { id: `c_${Date.now()}`, val, addr: randomHexAddr() }];
    setTrainCars(next);
    sfx.playThud();
    setActiveCodeLine(8);
    setTrainInputVal(String(val + 10));
    setLogMsg(`🚂 Appended carriage [${val}] before NULL caboose. Previous tail coupler updated.`);
  };

  const handleTrainInsertAt = () => {
    if (trainCars.length >= 6) return;
    const val = parseInt(trainInputVal, 10) || 25;
    const idx = Math.min(trainCars.length, 2);
    const next = [...trainCars];
    next.splice(idx, 0, { id: `c_${Date.now()}`, val, addr: randomHexAddr() });
    setTrainCars(next);
    setActiveCarIdx(idx);
    sfx.playDing();
    setActiveCodeLine(8);
    setLogMsg(`🔧 Uncoupled track at index ${idx} and spliced carriage [${val}] with Next pointer re-linked!`);
  };

  const handleTrainRemoveLast = () => {
    if (trainCars.length === 0) return;
    const removed = trainCars[trainCars.length - 1];
    setTrainCars(trainCars.slice(0, -1));
    sfx.playPop();
    setLogMsg(`❌ Uncoupled tail carriage [${removed.val}] (${removed.addr}). New tail now points to NULL.`);
  };

  const handleTrainTraverse = async () => {
    for (let i = 0; i < trainCars.length; i++) {
      setActiveCarIdx(i);
      sfx.playFlick();
      const curr = trainCars[i];
      const nxt = trainCars[i + 1] ? `${trainCars[i + 1].val} (${trainCars[i + 1].addr})` : 'NULL';
      setLogMsg(`🔦 Inspecting Carriage ${i}: Data = [${curr.val}], Addr = ${curr.addr}, Next Pointer → ${nxt}`);
      await new Promise((r) => setTimeout(r, 420));
    }
    setActiveCarIdx(-1);
    sfx.playFanfare();
    setLogMsg('✅ Reached NULL caboose! Full O(n) pointer traversal completed.');
  };

  // TREE TRAVERSAL HANDLER
  const runTreeTraversal = async (type) => {
    let seq = [];
    if (type === 'in') seq = [3, 5, 7, 10, 12, 15, 18];
    else if (type === 'pre') seq = [10, 5, 3, 7, 15, 12, 18];
    else if (type === 'post') seq = [3, 7, 5, 12, 18, 15, 10];
    else seq = [10, 5, 15, 3, 7, 12, 18];

    setVisitedTreeVals([]);
    const acc = [];
    for (let v of seq) {
      setActiveTreeVal(v);
      acc.push(v);
      setVisitedTreeVals([...acc]);
      setTraversalOrderText(`${type.toUpperCase()}-ORDER: ${acc.join(' → ')}`);
      sfx.playDing();
      await new Promise((r) => setTimeout(r, 380));
    }
    setActiveTreeVal(null);
    sfx.playFanfare();
    setLogMsg(`🌳 Completed ${type.toUpperCase()}-ORDER Tree Traversal: [${acc.join(' → ')}].`);
  };

  // GRAPH ROUTE COMPUTATION
  const runCityGraphRoute = (mode) => {
    sfx.playFanfare();
    const routes = {
      'library-airport': {
        nodes: ['library', 'center', 'station', 'airport'],
        edges: ['library-center', 'center-station', 'station-airport'],
        dist: '14 km (Optimal via City Center & Station)'
      },
      'park-hospital': {
        nodes: ['park', 'center', 'museum', 'hospital'],
        edges: ['park-center', 'museum-center', 'museum-hospital'],
        dist: '11 km (Via City Center & Museum)'
      },
      'library-hospital': {
        nodes: ['library', 'museum', 'hospital'],
        edges: ['library-museum', 'museum-hospital'],
        dist: '9 km (Direct Northern Corridor)'
      },
      'park-airport': {
        nodes: ['park', 'station', 'airport'],
        edges: ['park-station', 'station-airport'],
        dist: '10 km (Southern Express Line)'
      }
    };
    const key = `${graphStart}-${graphEnd}`;
    const chosen = routes[key] || {
      nodes: ['library', 'center', 'station', 'airport'],
      edges: ['library-center', 'center-station', 'station-airport'],
      dist: '14 km (Shortest Weighted Path)'
    };
    setActiveGraphNodes(chosen.nodes);
    setActiveGraphEdges(chosen.edges);
    setTelemetry({
      label1: 'Algorithm', val1: mode === 'dijkstra' ? "Dijkstra's" : 'BFS Wave',
      label2: 'Path Hops', val2: `${chosen.edges.length} Edges`,
      label3: 'Total Distance', val3: chosen.dist.split(' ')[0] + ' km',
      status: 'Optimal Route'
    });
    setLogMsg(`🗺️ ${mode === 'dijkstra' ? "Dijkstra's Shortest Path" : 'BFS'} illuminated in cyan: ${chosen.nodes.map(n => n.toUpperCase()).join(' → ')} (${chosen.dist}).`);
  };

  // ARRAY HANDLERS
  const handleSelectParkingBay = (idx) => {
    setSelectedBay(idx);
    sfx.playDing();
    setActiveCodeLine(3);
    const car = parkingCars[idx];
    setTelemetry({
      label1: 'Selected Bay', val1: `Index [${idx}]`,
      label2: 'Address Calc', val2: `0x2000 + ${idx}*8`,
      label3: 'Access Time', val3: '1 CPU Cycle O(1)',
      status: 'Direct Hit'
    });
    setLogMsg(`⚡ O(1) Instant Array Lookup: Bay [${idx}] accessed directly via contiguous offset arithmetic (${car.name}, Plate ${car.plate}).`);
  };

  const handleArrayShiftInsert = async () => {
    const targetIdx = Math.max(0, Math.min(5, parseInt(arrayShiftIdx, 10) || 2));
    setActiveCodeLine(7);
    setLogMsg(`🚗 Inserting new car at Bay [${targetIdx}]: Shifting cars [${targetIdx}..5] one slot right in O(n) time...`);
    const next = [...parkingCars];
    for (let i = 5; i >= targetIdx; i--) {
      setSelectedBay(i + 1);
      sfx.playFlick();
      next[i + 1] = { ...next[i], slot: i + 1 };
      setParkingCars([...next]);
      await new Promise((r) => setTimeout(r, 240));
    }
    next[targetIdx] = {
      slot: targetIdx,
      plate: `NEW-${Math.floor(Math.random() * 89 + 10)}`,
      color: '#ec4899',
      name: 'Pink Hypercar'
    };
    setParkingCars(next);
    setSelectedBay(targetIdx);
    sfx.playThud();
    setActiveCodeLine(8);
    setTelemetry({
      label1: 'Inserted Bay', val1: `Index [${targetIdx}]`,
      label2: 'Cars Shifted', val2: `${6 - targetIdx} Slots`,
      label3: 'Time Cost', val3: 'O(n) Shift',
      status: 'Shifted'
    });
    setLogMsg(`✅ Inserted Pink Hypercar at Bay [${targetIdx}] after shifting ${6 - targetIdx} contiguous cars right.`);
  };

  // HARDWARE CACHE HANDLERS
  const runHardwareCacheSim = (mode) => {
    if (mode === 'array') {
      setLogMsg('⚡ Executing Contiguous Array Traversal: First access fetches full 64-byte Cache Line into L1...');
      const updated = cacheBlocks.map((b, i) => ({
        ...b,
        offset: `0x10${i * 8}`,
        status: i === 0 ? 'miss' : 'hit'
      }));
      setCacheBlocks(updated);
      sfx.playCacheMiss();
      setTimeout(() => sfx.playFanfare(), 280);
      setCacheStats({ hits: 7, misses: 1, cycles: 27, mode: 'Array (Spatial Locality — 87.5% Hit Rate)' });
      setTelemetry({
        label1: 'L1 Cache Hits', val1: '7 / 8 (87.5%)',
        label2: 'RAM Misses', val2: '1 Prefetch',
        label3: 'Total Latency', val3: '27 Cycles',
        status: '10x Faster'
      });
    } else {
      setLogMsg('🐢 Executing Scattered Linked List Traversal: Pointer chasing across non-contiguous Heap addresses triggers 100% Cache Misses!');
      const scatteredAddrs = ['0x1040', '0x8F20', '0x3A10', '0x9C40', '0x2E80', '0x7B50', '0x4D10', '0x6E90'];
      const updated = cacheBlocks.map((b, i) => ({
        ...b,
        offset: scatteredAddrs[i],
        status: 'miss'
      }));
      setCacheBlocks(updated);
      sfx.playCacheMiss();
      setCacheStats({ hits: 0, misses: 8, cycles: 160, mode: 'Linked List (Pointer Chasing — 0% Hit Rate)' });
      setTelemetry({
        label1: 'L1 Cache Hits', val1: '0 / 8 (0%)',
        label2: 'RAM Misses', val2: '8 Stalls',
        label3: 'Total Latency', val3: '160 Cycles',
        status: 'CPU Stalled'
      });
    }
  };

  /* ==========================================================================
     RENDER REAL-LIFE VECTOR DIAGRAMS
     ========================================================================== */
  const renderStackStage = () => (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-around gap-6 p-4">
      <div className="relative w-full max-w-xl h-96 flex flex-col items-center justify-end select-none">
        {books.length > 0 && (
          <div className="mb-3 flex items-center gap-2 bg-cyan-500/15 border border-cyan-400/50 text-cyan-300 px-3.5 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
            <span>TOP (Push / Pop here)</span>
            <span>↓ Index [{books.length - 1}]</span>
          </div>
        )}

        <div className="flex flex-col-reverse items-center gap-1.5 z-20 mb-1">
          {books.length === 0 ? (
            <div className="text-slate-400 text-sm italic mb-12 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-700">
              Study desk is empty (Stack Underflow state)
            </div>
          ) : (
            books.map((title, idx) => {
              const pal = bookPalette[idx % bookPalette.length];
              const isTop = idx === books.length - 1;
              const isPeeked = idx === peekBookIdx;
              const widthPx = 250 - idx * 8;
              return (
                <div
                  key={`${title}-${idx}`}
                  style={{
                    width: `${widthPx}px`,
                    background: `linear-gradient(90deg, ${pal.spine} 0%, ${pal.bg} 18%, ${pal.bg} 78%, #f8fafc 79%, #e2e8f0 98%)`,
                    borderColor: isTop ? '#38bdf8' : pal.border,
                    transform: isPeeked ? 'translateY(-10px) scale(1.05)' : 'none'
                  }}
                  className={`h-11 rounded-md border-2 shadow-xl flex items-center justify-between px-4 transition-all duration-300 relative ${
                    isTop ? 'ring-2 ring-cyan-400/60 shadow-cyan-500/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-black/35 text-white/90 px-1.5 py-0.5 rounded">
                      #{idx}
                    </span>
                    <span className="font-extrabold text-white text-sm tracking-wide drop-shadow">
                      {title}
                    </span>
                  </div>
                  <div className="w-10 h-7 bg-gradient-to-b from-white via-slate-100 to-slate-300 rounded-r-sm border-l border-slate-400 flex items-center justify-center">
                    <span className="text-[9px] font-mono font-bold text-slate-700">LIFO</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="w-full relative flex flex-col items-center">
          <div className="absolute left-6 bottom-6 z-10 hidden sm:block">
            <svg width="54" height="72" viewBox="0 0 54 72">
              <path d="M27 38 C15 24, 12 8, 22 4 C26 16, 27 28, 27 38" fill="#22c55e" />
              <path d="M27 38 C39 24, 42 8, 32 4 C28 16, 27 28, 27 38" fill="#16a34a" />
              <path d="M27 38 C27 18, 27 2, 27 2" stroke="#4ade80" strokeWidth="4" strokeLinecap="round" />
              <polygon points="14,38 40,38 35,66 19,66" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            </svg>
          </div>

          <div
            className="w-11/12 h-7 rounded-t-xl rounded-b-md shadow-2xl border-t-2 border-amber-300/40"
            style={{ background: 'linear-gradient(180deg, #d97706 0%, #92400e 60%, #78350f 100%)' }}
          />
          <div className="w-10/12 flex justify-between px-8">
            <div className="w-4 h-7 bg-amber-950 rounded-b" />
            <div className="w-4 h-7 bg-amber-950 rounded-b" />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-72 bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Real-Life Stack Rules</span>
        </div>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 font-bold">•</span>
            <span><strong>Only add or remove from the TOP:</strong> You cannot pull Book 1 from the bottom without toppling the pile.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">•</span>
            <span><strong>Last In, First Out (LIFO):</strong> The most recently placed book is always the first one picked up.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span><strong>O(1) Time Complexity:</strong> Both <code className="text-cyan-300">push()</code> and <code className="text-rose-300">pop()</code> operate directly on the <code className="text-amber-300">top</code> pointer.</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderQueueStage = () => (
    <div className="w-full h-full flex flex-col justify-between p-4 gap-4 select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2 bg-teal-500/20 border border-teal-400 text-teal-300 px-3 py-1 rounded-lg text-xs font-extrabold">
          <span>☕ FRONT (Dequeue — Served First)</span>
          <span>→ {queueLine[0]?.name || 'Empty'}</span>
        </div>
        {servedCustomer && (
          <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            🎉 Handed {servedCustomer.drink} to {servedCustomer.name}!
          </div>
        )}
        <div className="flex items-center gap-2 bg-purple-500/20 border border-purple-400 text-purple-300 px-3 py-1 rounded-lg text-xs font-extrabold">
          <span>🚶 REAR (Enqueue — New People Join)</span>
          <span>→ {queueLine[queueLine.length - 1]?.name || 'Empty'}</span>
        </div>
      </div>

      <div className="relative w-full bg-gradient-to-b from-slate-900/70 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[290px]">
        <div className="w-48 flex flex-col items-center shrink-0">
          <div className="bg-slate-900 border-2 border-amber-500/60 text-amber-200 px-3 py-1 rounded-md text-xs font-black tracking-wider mb-3 shadow-lg flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>COFFEE SHOP</span>
          </div>
          <svg width="150" height="95" viewBox="0 0 150 95">
            <circle cx="48" cy="30" r="13" fill="#fcd34d" />
            <path d="M35 24 Q48 14 61 24" fill="#1e3a8a" />
            <rect x="32" y="44" width="32" height="45" rx="8" fill="#3b82f6" />
            <rect x="37" y="50" width="22" height="38" rx="3" fill="#1e293b" />
            <rect x="82" y="52" width="26" height="22" rx="3" fill="#334155" />
            <rect x="88" y="74" width="14" height="14" fill="#475569" />
            <rect x="118" y="68" width="14" height="18" rx="2" fill="#f8fafc" />
            <path d="M121 62 Q125 55 129 62" stroke="#94a3b8" strokeWidth="2" fill="none" />
          </svg>
          <div
            className="w-44 h-16 rounded-lg border-t-4 border-amber-200/60 shadow-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #b45309 0%, #78350f 100%)' }}
          >
            <span className="text-[11px] font-extrabold text-amber-100 uppercase tracking-widest bg-black/30 px-2.5 py-1 rounded">
              Order Counter
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-start gap-5 overflow-x-auto py-4 px-2 relative">
          {queueLine.length === 0 ? (
            <div className="text-slate-400 text-sm italic py-12 mx-auto">
              No customers waiting in line. Click "Enqueue" to add a customer!
            </div>
          ) : (
            queueLine.map((person, idx) => {
              const pal = customerPalette[person.style % customerPalette.length];
              const isFront = idx === 0;
              const isRear = idx === queueLine.length - 1;
              return (
                <div
                  key={person.id}
                  className="flex flex-col items-center shrink-0 transition-all duration-300"
                >
                  <div
                    className={`mb-1.5 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      isFront
                        ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                        : isRear
                        ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isFront ? 'FRONT (1st)' : isRear ? 'REAR (Last)' : `Pos #${idx + 1}`}
                  </div>

                  <svg width="64" height="110" viewBox="0 0 64 110">
                    <circle cx="32" cy="22" r="12" fill="#fed7aa" />
                    <path d="M20 20 Q32 6 44 20 Q44 12 32 10 Q20 12 20 20" fill={pal.hair} />
                    {pal.bag && <rect x="38" y="38" width="14" height="28" rx="5" fill={pal.bag} />}
                    <rect x="18" y="36" width="28" height="36" rx="9" fill={pal.shirt} />
                    <rect x="21" y="70" width="9" height="32" rx="4" fill="#1e293b" />
                    <rect x="34" y="70" width="9" height="32" rx="4" fill="#1e293b" />
                    <rect x="18" y="99" width="13" height="6" rx="3" fill="#475569" />
                    <rect x="33" y="99" width="13" height="6" rx="3" fill="#475569" />
                  </svg>

                  <span className="text-xs font-bold text-white mt-1">{person.name}</span>
                  <span className="text-[10px] text-cyan-300 font-mono">{person.drink}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs">
        <span className="text-teal-400 font-bold">← Served first (from FRONT)</span>
        <span className="font-extrabold text-white tracking-wider bg-indigo-500/20 border border-indigo-400/40 px-3 py-0.5 rounded-full">
          FIFO — First In, First Out
        </span>
        <span className="text-purple-400 font-bold">New people join (at REAR) →</span>
      </div>
    </div>
  );

  const renderLinkedListStage = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 gap-4 select-none">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/40 text-blue-300 px-3 py-1 rounded-full text-xs font-bold">
          <TrainFront className="w-3.5 h-3.5" />
          <span>Dynamic Memory Carriages Connected by Next Pointers</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto py-6 px-2">
        <div className="min-w-max flex flex-col items-center mx-auto">
          <div className="flex items-center gap-2">
            {trainCars.map((car, idx) => {
              const isHighlighted = idx === activeCarIdx;
              return (
                <React.Fragment key={car.id}>
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-32 h-24 rounded-xl border-2 flex flex-col items-center justify-between p-2 shadow-xl transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-amber-500 border-white scale-110 shadow-amber-500/40'
                          : 'bg-gradient-to-b from-blue-500 to-blue-700 border-blue-300'
                      }`}
                    >
                      <div className="w-full flex justify-between items-center text-[10px] font-mono text-blue-100 px-1">
                        <span>{idx === 0 ? 'HEAD' : `Node ${idx}`}</span>
                        <span>{car.addr}</span>
                      </div>
                      <div className="w-20 h-10 bg-white rounded-lg shadow-inner flex items-center justify-center border border-blue-200">
                        <span className="text-xl font-black text-slate-900 font-mono">{car.val}</span>
                      </div>
                      <div className="text-[9px] font-mono text-blue-100">
                        next → {trainCars[idx + 1] ? trainCars[idx + 1].addr : 'NULL'}
                      </div>
                    </div>

                    <div className="w-24 flex justify-between px-1 -mt-1.5 z-10">
                      <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-400" />
                      <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-400" />
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center px-1">
                    <span className="text-[9px] font-mono text-cyan-300 font-bold">Next</span>
                    <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse" />
                    <div className="w-6 h-2 bg-slate-500 rounded-full" />
                  </div>
                </React.Fragment>
              );
            })}

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-b from-slate-600 to-slate-800 border-2 border-slate-400 flex flex-col items-center justify-center shadow-xl">
                <span className="text-[10px] font-mono text-slate-300 mb-1">END</span>
                <span className="text-base font-black text-white font-mono tracking-wider bg-slate-900/80 px-2.5 py-1 rounded">
                  NULL
                </span>
              </div>
              <div className="w-16 flex justify-between px-1 -mt-1.5 z-10">
                <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-500" />
                <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-500" />
              </div>
            </div>
          </div>

          <div className="w-full h-4 bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 rounded-full mt-1 border-y-2 border-slate-300 shadow-inner" />
          <div
            className="w-full h-2.5"
            style={{
              background: 'repeating-linear-gradient(90deg, #78350f 0px, #78350f 14px, transparent 14px, transparent 28px)'
            }}
          />
        </div>
      </div>

      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap justify-around gap-4 text-xs text-slate-300">
        <span>• Each carriage stores <strong>Data</strong> + a <strong>Next reference</strong> to the next node.</span>
        <span>• Nodes can live anywhere in memory (non-contiguous).</span>
        <span>• The last carriage always points to <strong>NULL</strong>.</span>
      </div>
    </div>
  );

  const renderTreeStage = () => {
    const coords = {
      10: { x: 320, y: 65, role: 'Root', color: '#7c3aed' },
      5: { x: 190, y: 155, role: 'Parent', color: '#2563eb' },
      15: { x: 450, y: 155, role: 'Parent', color: '#2563eb' },
      3: { x: 115, y: 255, role: 'Leaf', color: '#0891b2' },
      7: { x: 255, y: 255, role: 'Leaf', color: '#0891b2' },
      12: { x: 385, y: 255, role: 'Leaf', color: '#0891b2' },
      18: { x: 525, y: 255, role: 'Leaf', color: '#0891b2' }
    };

    return (
      <div className="w-full h-full flex flex-col items-center justify-between p-2">
        <svg viewBox="0 0 680 350" className="w-full max-h-[340px]">
          <ellipse cx="320" cy="332" rx="180" ry="14" fill="#1e293b" />
          <path d="M320 330 Q320 210 320 65" stroke="#854d0e" strokeWidth="22" strokeLinecap="round" fill="none" />
          <path d="M320 210 Q240 180 190 155" stroke="#854d0e" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M320 210 Q400 180 450 155" stroke="#854d0e" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M190 155 Q145 200 115 255" stroke="#a16207" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M190 155 Q225 200 255 255" stroke="#a16207" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M450 155 Q415 200 385 255" stroke="#a16207" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M450 155 Q495 200 525 255" stroke="#a16207" strokeWidth="9" strokeLinecap="round" fill="none" />

          {[
            [270, 95], [370, 95], [150, 135], [230, 140], [410, 140], [490, 135],
            [95, 220], [150, 220], [280, 220], [360, 220], [550, 220]
          ].map(([lx, ly], i) => (
            <circle key={i} cx={lx} cy={ly} r="14" fill="#22c55e" opacity="0.85" />
          ))}

          <g stroke="#60a5fa" strokeWidth="2" fill="none">
            <path d="M575 45 L585 45 L585 85 L575 85" />
            <path d="M575 135 L585 135 L585 175 L575 175" />
            <path d="M575 235 L585 235 L585 275 L575 275" />
          </g>
          <text x="595" y="70" fill="#c084fc" fontSize="13" fontWeight="800">Root</text>
          <text x="595" y="160" fill="#60a5fa" fontSize="13" fontWeight="800">Parent</text>
          <text x="595" y="210" fill="#38bdf8" fontSize="12" fontWeight="700">Child</text>
          <text x="595" y="260" fill="#22d3ee" fontSize="13" fontWeight="800">Leaf</text>

          {Object.entries(coords).map(([valStr, pos]) => {
            const val = Number(valStr);
            const isCurr = activeTreeVal === val;
            const isVis = visitedTreeVals.includes(val);
            return (
              <g
                key={val}
                transform={`translate(${pos.x}, ${pos.y})`}
                className="cursor-pointer"
                onClick={() => {
                  setActiveTreeVal(val);
                  sfx.playDing();
                  setLogMsg(`🌳 Selected Node [${val}] (${pos.role} level).`);
                }}
              >
                <circle
                  r={isCurr ? 31 : 26}
                  fill={isCurr ? '#f59e0b' : isVis ? '#10b981' : pos.color}
                  stroke="#ffffff"
                  strokeWidth={isCurr ? 4 : 2.5}
                />
                <text
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-cyan-300 font-mono font-bold">{traversalOrderText}</span>
          <span className="text-slate-400">BST Rule: Left Subtree &lt; Parent &lt; Right Subtree</span>
        </div>
      </div>
    );
  };

  const renderAVLStage = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { setAvlMode('ll'); sfx.playCacheMiss(); setLogMsg('⚠️ Left-Left Imbalance (BF = +2 at Node 30). Click "Execute Rotation" to rebalance!'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${avlMode === 'll' ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
        >
          1. Left-Left Skew (BF = +2)
        </button>
        <button
          onClick={() => { setAvlMode('rr'); sfx.playCacheMiss(); setLogMsg('⚠️ Right-Right Imbalance (BF = -2 at Node 10). Click "Execute Rotation" to rebalance!'); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${avlMode === 'rr' ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
        >
          2. Right-Right Skew (BF = -2)
        </button>
        <button
          onClick={() => { setAvlMode('balanced'); sfx.playFanfare(); setLogMsg('✅ Executed O(1) Tree Rotation! Root is now [20] with Balance Factor = 0.'); }}
          className="px-4 py-1.5 rounded-lg text-xs font-extrabold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
        >
          🔄 Execute AVL Rotation → Balanced (BF = 0)
        </button>
      </div>

      <svg viewBox="0 0 650 300" className="w-full max-h-[290px]">
        {avlMode === 'll' && (
          <>
            <line x1="380" y1="65" x2="260" y2="155" stroke="#f43f5e" strokeWidth="4" />
            <line x1="260" y1="155" x2="140" y2="245" stroke="#f59e0b" strokeWidth="4" />
            <g transform="translate(380,65)">
              <circle r="26" fill="#be123c" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">30</text>
              <text x="40" fill="#fda4af" fontSize="12" fontWeight="800">BF = +2 (Unbalanced!)</text>
            </g>
            <g transform="translate(260,155)">
              <circle r="26" fill="#0284c7" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">20</text>
              <text x="40" fill="#fcd34d" fontSize="12" fontWeight="800">BF = +1 (Pivot)</text>
            </g>
            <g transform="translate(140,245)">
              <circle r="26" fill="#0284c7" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">10</text>
              <text x="40" fill="#7dd3fc" fontSize="12" fontWeight="800">BF = 0</text>
            </g>
          </>
        )}
        {avlMode === 'rr' && (
          <>
            <line x1="240" y1="65" x2="360" y2="155" stroke="#f43f5e" strokeWidth="4" />
            <line x1="360" y1="155" x2="480" y2="245" stroke="#f59e0b" strokeWidth="4" />
            <g transform="translate(240,65)">
              <circle r="26" fill="#be123c" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">10</text>
              <text x="-135" fill="#fda4af" fontSize="12" fontWeight="800">BF = -2 (Unbalanced!)</text>
            </g>
            <g transform="translate(360,155)">
              <circle r="26" fill="#0284c7" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">20</text>
              <text x="40" fill="#fcd34d" fontSize="12" fontWeight="800">BF = -1 (Pivot)</text>
            </g>
            <g transform="translate(480,245)">
              <circle r="26" fill="#0284c7" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">30</text>
              <text x="40" fill="#7dd3fc" fontSize="12" fontWeight="800">BF = 0</text>
            </g>
          </>
        )}
        {avlMode === 'balanced' && (
          <>
            <line x1="325" y1="80" x2="195" y2="205" stroke="#10b981" strokeWidth="5" />
            <line x1="325" y1="80" x2="455" y2="205" stroke="#10b981" strokeWidth="5" />
            <g transform="translate(325,80)">
              <circle r="29" fill="#059669" stroke="#fff" strokeWidth="3.5" />
              <text fill="#fff" fontWeight="900" fontSize="16" textAnchor="middle" dominantBaseline="central">20</text>
              <text y="-38" fill="#34d399" fontSize="13" fontWeight="800" textAnchor="middle">ROOT • BF = 0 (Balanced)</text>
            </g>
            <g transform="translate(195,205)">
              <circle r="25" fill="#2563eb" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">10</text>
              <text y="38" fill="#93c5fd" fontSize="12" fontWeight="700" textAnchor="middle">Left Child • BF = 0</text>
            </g>
            <g transform="translate(455,205)">
              <circle r="25" fill="#2563eb" stroke="#fff" strokeWidth="3" />
              <text fill="#fff" fontWeight="900" textAnchor="middle" dominantBaseline="central">30</text>
              <text y="38" fill="#93c5fd" fontSize="12" fontWeight="700" textAnchor="middle">Right Child • BF = 0</text>
            </g>
          </>
        )}
      </svg>
    </div>
  );

  const renderGraphStage = () => {
    const landmarks = {
      library: { x: 130, y: 80, label: 'Library', emoji: '📖', color: '#2563eb' },
      museum: { x: 330, y: 75, label: 'Museum', emoji: '🏛️', color: '#2563eb' },
      center: { x: 290, y: 185, label: 'City Center', emoji: '🏙️', color: '#1d4ed8' },
      hospital: { x: 485, y: 160, label: 'Hospital', emoji: '🏥', color: '#2563eb' },
      park: { x: 105, y: 270, label: 'Park', emoji: '🌲', color: '#0891b2' },
      station: { x: 335, y: 285, label: 'Station', emoji: '🚉', color: '#2563eb' },
      airport: { x: 545, y: 285, label: 'Airport', emoji: '✈️', color: '#2563eb' }
    };

    const roads = [
      { id: 'library-museum', from: 'library', to: 'museum', km: '4km' },
      { id: 'library-center', from: 'library', to: 'center', km: '3km' },
      { id: 'library-park', from: 'library', to: 'park', km: '6km' },
      { id: 'museum-center', from: 'museum', to: 'center', km: '2km' },
      { id: 'museum-hospital', from: 'museum', to: 'hospital', km: '5km' },
      { id: 'park-center', from: 'park', to: 'center', km: '4km' },
      { id: 'park-station', from: 'park', to: 'station', km: '5km' },
      { id: 'center-station', from: 'center', to: 'station', km: '4km' },
      { id: 'center-hospital', from: 'center', to: 'hospital', km: '5km' },
      { id: 'station-hospital', from: 'station', to: 'hospital', km: '4km' },
      { id: 'station-airport', from: 'station', to: 'airport', km: '7km' },
      { id: 'hospital-airport', from: 'hospital', to: 'airport', km: '6km' }
    ];

    return (
      <div className="w-full h-full flex flex-col items-center justify-between p-2">
        <svg viewBox="0 0 660 340" className="w-full max-h-[330px] rounded-xl bg-[#0c1424] border border-slate-800">
          <path d="M610 0 Q560 150 640 340" stroke="#0284c7" strokeWidth="28" opacity="0.25" fill="none" />
          {roads.map((r) => {
            const u = landmarks[r.from];
            const v = landmarks[r.to];
            const isTraveled = activeGraphEdges.includes(r.id);
            return (
              <g key={r.id}>
                <line
                  x1={u.x} y1={u.y} x2={v.x} y2={v.y}
                  stroke={isTraveled ? '#22d3ee' : '#475569'}
                  strokeWidth={isTraveled ? 7 : 4}
                />
                {isTraveled && (
                  <line
                    x1={u.x} y1={u.y} x2={v.x} y2={v.y}
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="6,6"
                  />
                )}
                <text
                  x={(u.x + v.x) / 2}
                  y={(u.y + v.y) / 2 - 6}
                  fill={isTraveled ? '#67e8f9' : '#94a3b8'}
                  fontSize="10"
                  fontWeight="800"
                  textAnchor="middle"
                >
                  {r.km}
                </text>
              </g>
            );
          })}

          {Object.entries(landmarks).map(([key, lm]) => {
            const isVisited = activeGraphNodes.includes(key);
            return (
              <g key={key} transform={`translate(${lm.x}, ${lm.y})`}>
                <circle
                  r="24"
                  fill={isVisited ? lm.color : '#1e293b'}
                  stroke={isVisited ? '#38bdf8' : '#64748b'}
                  strokeWidth={isVisited ? 3.5 : 2}
                />
                <text y="5" fontSize="18" textAnchor="middle">{lm.emoji}</text>
                <text y="38" fill="#f8fafc" fontSize="11" fontWeight="800" textAnchor="middle">
                  {lm.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const renderArrayStage = () => (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 gap-4 select-none">
      <div className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 rounded-full">
        Click any Parking Bay [0..6] for instant O(1) memory-offset lookup
      </div>

      <div className="bg-[#1e293b] border-4 border-slate-600 rounded-2xl p-5 shadow-2xl overflow-x-auto max-w-full">
        <div className="flex items-center gap-3 min-w-max">
          {parkingCars.map((car, idx) => {
            const isSel = idx === selectedBay;
            return (
              <div
                key={idx}
                onClick={() => handleSelectParkingBay(idx)}
                className={`w-24 h-44 rounded-lg border-x-2 border-t-2 flex flex-col items-center justify-between p-2 cursor-pointer transition-all duration-300 relative ${
                  isSel
                    ? 'border-purple-400 bg-purple-500/20 ring-4 ring-purple-400/40 scale-105 shadow-xl shadow-purple-500/30'
                    : 'border-slate-400/60 bg-slate-800/70 hover:bg-slate-800'
                }`}
              >
                <div
                  className={`w-10 h-6 rounded flex items-center justify-center font-mono text-xs font-black ${
                    isSel ? 'bg-purple-500 text-white' : 'bg-white text-slate-900'
                  }`}
                >
                  {idx}
                </div>

                <svg width="56" height="96" viewBox="0 0 56 96">
                  <rect x="3" y="14" width="6" height="16" rx="2" fill="#090d16" />
                  <rect x="47" y="14" width="6" height="16" rx="2" fill="#090d16" />
                  <rect x="3" y="66" width="6" height="16" rx="2" fill="#090d16" />
                  <rect x="47" y="66" width="6" height="16" rx="2" fill="#090d16" />
                  <rect x="7" y="6" width="42" height="84" rx="14" fill={car.color} stroke="#ffffff" strokeWidth="1.5" />
                  <path d="M13 28 L43 28 L39 42 L17 42 Z" fill="#0f172a" opacity="0.8" />
                  <path d="M16 68 L40 68 L42 78 L14 78 Z" fill="#0f172a" opacity="0.8" />
                  <rect x="16" y="42" width="24" height="25" rx="4" fill={car.color} />
                  <ellipse cx="15" cy="9" rx="4" ry="2" fill="#fef08a" />
                  <ellipse cx="41" cy="9" rx="4" ry="2" fill="#fef08a" />
                </svg>

                <span className="text-[10px] font-mono font-bold text-slate-200 bg-slate-950/80 px-1.5 py-0.5 rounded">
                  {car.plate}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap justify-around gap-3 text-xs text-slate-300">
        <span>• Each car has a fixed numerical <strong>Index [0..6]</strong>.</span>
        <span>• Stored in <strong>contiguous memory</strong> (adjacent bays).</span>
        <span>• Address of Bay <code className="text-cyan-300">i</code> = <code className="text-amber-300">Base_Address + (i × Car_Size)</code>.</span>
      </div>
    </div>
  );

  const renderSortingStage = () => {
    if (activeAlgo === 'race') {
      const snapA = raceSnapsA[Math.min(raceStep, raceSnapsA.length - 1)] || raceSnapsA[0];
      const snapB = raceSnapsB[Math.min(raceStep, raceSnapsB.length - 1)] || raceSnapsB[0];
      const chartData = [
        { name: 'Comparisons', LaneA: snapA.comparisons, LaneB: snapB.comparisons },
        { name: 'Swaps/Writes', LaneA: snapA.swaps, LaneB: snapB.swaps }
      ];

      return (
        <div className="w-full h-full flex flex-col gap-4 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-cyan-500/40 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-cyan-400">LANE A: {SORT_META[raceAlgoA].title.split('—')[0]}</span>
                <span className="font-mono text-emerald-400">
                  {raceStep >= raceSnapsA.length - 1 ? '🏆 FINISHED!' : `Step ${raceStep + 1}/${raceSnapsA.length}`}
                </span>
              </div>
              <div className="h-36 bg-slate-950 rounded-lg p-3 flex items-end gap-1.5 border border-slate-800">
                {snapA.array.map((v, i) => (
                  <div
                    key={i}
                    style={{ height: `${v}%` }}
                    className={`flex-1 rounded-t transition-all duration-150 flex items-end justify-center text-[10px] font-mono font-bold pb-1 ${
                      snapA.sorted.includes(i)
                        ? 'bg-emerald-500 text-slate-950'
                        : snapA.swapping.includes(i)
                        ? 'bg-rose-500 text-white'
                        : snapA.comparing.includes(i)
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-cyan-500 text-slate-950'
                    }`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-500/40 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-purple-400">LANE B: {SORT_META[raceAlgoB].title.split('—')[0]}</span>
                <span className="font-mono text-amber-400">
                  {raceStep >= raceSnapsB.length - 1 ? '🏁 FINISHED!' : `Step ${raceStep + 1}/${raceSnapsB.length}`}
                </span>
              </div>
              <div className="h-36 bg-slate-950 rounded-lg p-3 flex items-end gap-1.5 border border-slate-800">
                {snapB.array.map((v, i) => (
                  <div
                    key={i}
                    style={{ height: `${v}%` }}
                    className={`flex-1 rounded-t transition-all duration-150 flex items-end justify-center text-[10px] font-mono font-bold pb-1 ${
                      snapB.sorted.includes(i)
                        ? 'bg-emerald-500 text-slate-950'
                        : snapB.swapping.includes(i)
                        ? 'bg-rose-500 text-white'
                        : snapB.comparing.includes(i)
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-purple-500 text-white'
                    }`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-300 mb-2">
              Real-Time Operations Telemetry (Lane A vs Lane B)
            </div>
            <div className="relative h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={95} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                  />
                  <Bar dataKey="LaneA" name="Lane A" fill="#38bdf8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="LaneB" name="Lane B" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    const suites = ['♠', '♥', '♦', '♣'];

    return (
      <div className="w-full h-full flex flex-col justify-between p-4 gap-4 select-none">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-cyan-300">{SORT_META[activeAlgo]?.title}</span>
          <span className="font-mono text-slate-400">
            Timeline Frame: {sortStepIdx + 1} / {sortSnapshots.length}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 flex-wrap py-6">
          {currentSortSnap.array.map((val, idx) => {
            const isComp = currentSortSnap.comparing.includes(idx);
            const isSwap = currentSortSnap.swapping.includes(idx);
            const isSort = currentSortSnap.sorted.includes(idx);
            const isPivot = currentSortSnap.pivot === idx;

            if (activeAlgo === 'bubble') {
              const sizePx = 46 + val * 0.48;
              return (
                <div
                  key={idx}
                  style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
                  className={`rounded-full flex flex-col items-center justify-center font-mono font-black text-white transition-all duration-300 relative shadow-xl ${
                    isSwap
                      ? 'bg-gradient-to-br from-rose-300 via-rose-500 to-rose-800 scale-110 ring-4 ring-rose-400/50'
                      : isComp
                      ? 'bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 scale-105 ring-4 ring-amber-400/50'
                      : isSort
                      ? 'bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-800'
                      : 'bg-gradient-to-br from-cyan-200 via-sky-500 to-blue-800'
                  }`}
                >
                  <div className="w-3 h-2 bg-white/70 rounded-full absolute top-2 left-3 rotate-[-25deg]" />
                  <span className="text-sm drop-shadow">{val}</span>
                </div>
              );
            }

            if (activeAlgo === 'insertion') {
              const suit = suites[val % 4];
              const isRed = suit === '♥' || suit === '♦';
              return (
                <div
                  key={idx}
                  className={`w-20 h-32 rounded-xl bg-white border-2 shadow-2xl p-2 flex flex-col justify-between transition-all duration-300 ${
                    isPivot || isSwap
                      ? '-translate-y-6 border-rose-500 ring-4 ring-rose-500/40 bg-rose-50'
                      : isComp
                      ? '-translate-y-3 border-amber-400 ring-4 ring-amber-400/40 bg-amber-50'
                      : isSort
                      ? 'border-emerald-500 ring-2 ring-emerald-400/40'
                      : 'border-slate-300'
                  }`}
                >
                  <div className={`text-xs font-black flex justify-between ${isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                    <span>{val}</span>
                    <span>{suit}</span>
                  </div>
                  <div className={`text-2xl font-black text-center ${isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                    {val}
                  </div>
                  <div className={`text-xs font-black flex justify-between rotate-180 ${isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                    <span>{val}</span>
                    <span>{suit}</span>
                  </div>
                </div>
              );
            }

            if (activeAlgo === 'selection') {
              const sz = 46 + val * 0.42;
              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  {isPivot && (
                    <span className="text-[10px] font-extrabold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full animate-bounce">
                      MIN LOCK
                    </span>
                  )}
                  <div
                    style={{ width: `${sz}px`, height: `${sz}px` }}
                    className={`rounded-full flex flex-col items-center justify-center font-mono font-black text-white shadow-xl transition-all duration-300 ${
                      isSwap
                        ? 'bg-purple-600 ring-4 ring-purple-400 scale-110'
                        : isPivot
                        ? 'bg-amber-500 ring-4 ring-amber-300 scale-110'
                        : isComp
                        ? 'bg-cyan-500 ring-4 ring-cyan-300'
                        : isSort
                        ? 'bg-emerald-600'
                        : 'bg-red-600'
                    }`}
                  >
                    <span className="text-xs">🍎</span>
                    <span className="text-xs">{val}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                style={{ height: `${64 + val * 0.85}px` }}
                className={`w-16 rounded-xl border-2 flex flex-col items-center justify-between p-2 transition-all duration-300 shadow-xl ${
                  isPivot
                    ? 'bg-purple-600 border-white -translate-y-3 ring-4 ring-purple-400/50'
                    : isSwap
                    ? 'bg-rose-600 border-white -translate-y-2'
                    : isComp
                    ? 'bg-amber-500 border-white text-slate-950'
                    : isSort
                    ? 'bg-emerald-600 border-emerald-300'
                    : 'bg-slate-800 border-slate-600'
                }`}
              >
                <span className="text-sm">{activeAlgo === 'quick' ? '🧳' : '📦'}</span>
                <span className="font-mono font-black text-sm">{val}</span>
                <span className="text-[9px] font-mono opacity-75">#{idx}</span>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 shrink-0">Scrub Timeline:</span>
          <input
            type="range"
            min="0"
            max={Math.max(0, sortSnapshots.length - 1)}
            value={sortStepIdx}
            onChange={(e) => {
              setIsSortPlaying(false);
              const idx = Number(e.target.value);
              setSortStepIdx(idx);
              const s = sortSnapshots[idx];
              if (s) {
                setActiveCodeLine(s.line);
                setLogMsg(s.msg);
              }
            }}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    );
  };

  const renderSystemsStage = () => {
    if (activeSys === 'cache') {
      const chartData = [
        { name: 'Contiguous Array', LatencyCycles: 27 },
        { name: 'Scattered Linked List', LatencyCycles: 160 }
      ];
      return (
        <div className="w-full h-full flex flex-col justify-between p-4 gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
              CPU L1 Cache Line (64 Bytes = 8 Contiguous 8-Byte Blocks)
            </span>
            <span className="text-xs font-mono text-emerald-400">{cacheStats.mode}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {cacheBlocks.map((b) => (
              <div
                key={b.idx}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 font-mono transition-all duration-300 ${
                  b.status === 'hit'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : b.status === 'miss'
                    ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/20'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                <span className="text-[10px] opacity-75">{b.offset}</span>
                <span className="text-sm font-black">[{b.val}]</span>
                <span className="text-[10px] font-extrabold uppercase">
                  {b.status === 'hit' ? '⚡ HIT (1c)' : b.status === 'miss' ? '🐢 MISS (20c)' : 'IDLE'}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3">
            <div className="text-xs font-bold text-slate-300 mb-2">
              CPU Cycle Latency Comparison (Lower is Faster)
            </div>
            <div className="relative h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={145} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                  <Bar dataKey="LatencyCycles" name="Total CPU Cycles" fill="#38bdf8" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col items-center justify-between p-4 gap-4">
        <div className="text-xs font-bold text-amber-300">
          x86-64 Virtual Memory: Call Stack grows DOWNWARD from 0x7FFF_FFFF
        </div>
        <div className="w-full max-w-lg space-y-2">
          {callFrames.map((f, idx) => {
            const isTop = idx === callFrames.length - 1;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border-2 flex items-center justify-between font-mono text-xs transition-all ${
                  f.status === 'overflow'
                    ? 'bg-rose-500/25 border-rose-500 text-rose-200 animate-pulse'
                    : isTop
                    ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-black text-sm">{f.fn}</div>
                  <div className="text-[11px] text-slate-400">{f.vars}</div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-300 font-bold">{f.rsp}</div>
                  {isTop && <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">← RSP</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAtlasOverview = () => {
    const cards = [
      {
        id: 'stack',
        title: 'STACK',
        badge: 'LIFO — Last In, First Out',
        accent: 'from-purple-500/20 to-blue-600/20 border-blue-500/40',
        bullets: ['Only add or remove books from the TOP.', 'Last In, First Out (LIFO) discipline.'],
        preview: (
          <div className="flex flex-col items-center py-2">
            <div className="text-[10px] font-bold text-cyan-300 mb-1">TOP (Push/Pop here) ↓</div>
            {['Book 4 (Purple)', 'Book 3 (Sky Blue)', 'Book 2 (Emerald)', 'Book 1 (Royal Blue)'].map((b, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: ['#7c3aed', '#0284c7', '#10b981', '#1d4ed8'][i],
                  width: `${175 - i * 6}px`
                }}
                className="h-6 rounded border border-white/30 text-[10px] font-bold text-white px-2.5 flex items-center justify-between mb-1 shadow"
              >
                <span>{b.split(' ')[0]} {b.split(' ')[1]}</span>
                <span className="w-5 h-3.5 bg-white/90 rounded-sm" />
              </div>
            ))}
            <div className="w-48 h-2.5 bg-amber-700 rounded-full mt-0.5" />
          </div>
        )
      },
      {
        id: 'queue',
        title: 'QUEUE',
        badge: 'FIFO — First In, First Out',
        accent: 'from-teal-500/20 to-purple-600/20 border-teal-500/40',
        bullets: ['Served first from FRONT (Dequeue).', 'New people join at REAR (Enqueue).'],
        preview: (
          <div className="flex items-end justify-center gap-3 py-3">
            <div className="bg-amber-800 border border-amber-500 px-2 py-2 rounded text-[10px] font-bold text-amber-100">
              ☕ SHOP
            </div>
            {[
              { c: '#2563eb', tag: 'FRONT' },
              { c: '#eab308', tag: '2nd' },
              { c: '#10b981', tag: '3rd' },
              { c: '#9333ea', tag: 'REAR' }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-cyan-300 mb-0.5">{p.tag}</span>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-200 mb-0.5" />
                <div style={{ backgroundColor: p.c }} className="w-5 h-8 rounded-t-lg" />
              </div>
            ))}
          </div>
        )
      },
      {
        id: 'linkedlist',
        title: 'LINKED LIST',
        badge: 'Nodes + Next Pointers',
        accent: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40',
        bullets: ['Each carriage stores data + reference to next node.', 'Last carriage points to NULL.'],
        preview: (
          <div className="flex items-center justify-center gap-1.5 py-5">
            {[10, 20, 30, 40].map((n) => (
              <React.Fragment key={n}>
                <div className="w-11 h-9 rounded bg-blue-600 border border-blue-300 flex items-center justify-center">
                  <span className="bg-white text-slate-900 font-mono font-black text-xs px-1.5 rounded">{n}</span>
                </div>
                <span className="text-cyan-400 font-bold text-xs">→</span>
              </React.Fragment>
            ))}
            <div className="w-12 h-9 rounded bg-slate-700 border border-slate-400 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              NULL
            </div>
          </div>
        )
      },
      {
        id: 'tree',
        title: 'TREE',
        badge: 'Root • Parent • Child • Leaf',
        accent: 'from-emerald-500/20 to-blue-600/20 border-emerald-500/40',
        bullets: ['Hierarchical structure with a Root node at top.', 'Branches split into Parent, Child, and Leaf nodes.'],
        preview: (
          <div className="flex flex-col items-center py-2 gap-1.5">
            <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-xs font-black">
              10
            </div>
            <div className="flex gap-10">
              <div className="w-7 h-7 rounded-full bg-blue-600 border border-white flex items-center justify-center text-xs font-bold">5</div>
              <div className="w-7 h-7 rounded-full bg-blue-600 border border-white flex items-center justify-center text-xs font-bold">15</div>
            </div>
            <div className="flex gap-4">
              {[3, 7, 12, 18].map((v) => (
                <div key={v} className="w-6 h-6 rounded-full bg-cyan-600 border border-white flex items-center justify-center text-[10px] font-bold">
                  {v}
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        id: 'graph',
        title: 'GRAPH',
        badge: 'Vertices & Weighted Road Edges',
        accent: 'from-cyan-500/20 to-indigo-600/20 border-cyan-400/40',
        bullets: ['Network of city landmarks (vertices) connected by roads (edges).', 'Finds optimal shortest routes via Dijkstra / BFS.'],
        preview: (
          <div className="flex items-center justify-center gap-3 py-4">
            <div className="px-2.5 py-1.5 rounded-full bg-blue-600 border border-cyan-300 text-[10px] font-bold">📖 Library</div>
            <div className="w-8 h-1 bg-cyan-400" />
            <div className="px-2.5 py-1.5 rounded-full bg-indigo-600 border border-cyan-300 text-[10px] font-bold">🏙️ Center</div>
            <div className="w-8 h-1 bg-cyan-400" />
            <div className="px-2.5 py-1.5 rounded-full bg-emerald-600 border border-cyan-300 text-[10px] font-bold">✈️ Airport</div>
          </div>
        )
      },
      {
        id: 'array',
        title: 'ARRAY',
        badge: 'Contiguous Indexed Parking [0..6]',
        accent: 'from-purple-500/20 to-amber-500/20 border-purple-400/40',
        bullets: ['Each element has a fixed index (parking slot position).', 'Stored in contiguous memory for instant O(1) lookup.'],
        preview: (
          <div className="flex items-center justify-center gap-1.5 py-3">
            {['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#eab308', '#0891b2'].map((c, i) => (
              <div
                key={i}
                className={`p-1 rounded border flex flex-col items-center ${
                  i === 3 ? 'border-purple-400 bg-purple-500/30 ring-2 ring-purple-400' : 'border-slate-600 bg-slate-800'
                }`}
              >
                <span className="text-[9px] font-mono font-bold bg-white text-slate-900 px-1 rounded mb-1">{i}</span>
                <div style={{ backgroundColor: c }} className="w-4 h-7 rounded-sm" />
              </div>
            ))}
          </div>
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Reference Atlas</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Data Structures — Real-Life Examples (Dark Edition)
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Click any of the 6 real-world cards below to launch its full interactive simulator with live code stepping, hardware telemetry, and synthesized sound effects.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveSection('algo'); sfx.playDing(); }}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Open Sorting Lab</span>
            </button>
            <button
              onClick={() => { setActiveSection('sys'); sfx.playDing(); }}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-purple-500 text-white hover:bg-purple-400 transition shadow-lg shadow-purple-500/20 flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4" />
              <span>CPU Cache Simulator</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveDS(c.id);
                setActiveSection('ds');
                sfx.playDing();
              }}
              className={`bg-gradient-to-br ${c.accent} bg-slate-900/90 border rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-400 transition-all duration-200 group`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                  <span className="text-lg font-black tracking-wider text-white group-hover:text-cyan-300 transition">
                    {c.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-slate-950/90 text-cyan-300 px-2.5 py-1 rounded-full border border-slate-700">
                    {c.badge}
                  </span>
                </div>
                <div className="bg-slate-950/80 rounded-xl border border-slate-800/90 p-2 mb-3">
                  {c.preview}
                </div>
                <ul className="space-y-1 text-xs text-slate-300 mb-4">
                  {c.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-2 rounded-lg bg-slate-800/90 group-hover:bg-cyan-400 group-hover:text-slate-950 text-cyan-300 font-extrabold text-xs transition flex items-center justify-center gap-1.5">
                <span>Launch Interactive {c.title} Lab</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-50 bg-[#0b1120]/95 backdrop-blur-md border-b border-slate-800/90 px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        <div
          onClick={() => setActiveSection('atlas')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg shadow-cyan-500/30">
            AV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                AlgoVista
              </h1>
              <span className="text-[10px] font-mono uppercase font-extrabold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                React + SVG Lab
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Real-Life Data Structures, Physical Sorting & Hardware Cache Visualizer
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
          {[
            { id: 'atlas', label: '🏠 Visual Atlas', icon: Layers },
            { id: 'ds', label: '📦 Data Structures (7)', icon: BookOpen },
            { id: 'algo', label: '⚡ Sorting & Duel (6)', icon: Zap },
            { id: 'sys', label: '💾 Hardware Cache', icon: Cpu }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSection(tab.id);
                sfx.playFlick();
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPromptModal(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 hover:bg-indigo-500/30 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini Prompt</span>
          </button>

          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              soundOn
                ? 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-400'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundOn ? 'SFX: ON' : 'SFX: OFF'}</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 lg:p-6 flex flex-col gap-5">
        {activeSection === 'atlas' ? (
          renderAtlasOverview()
        ) : (
          <>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {activeSection === 'ds' &&
                [
                  { id: 'stack', name: '📚 Stack (Books)' },
                  { id: 'queue', name: '☕ Queue (Coffee Shop)' },
                  { id: 'linkedlist', name: '🚂 Linked List (Train)' },
                  { id: 'tree', name: '🌳 Tree (Botanical)' },
                  { id: 'avl', name: '⚖️ AVL Rotations' },
                  { id: 'graph', name: '🗺️ Graph (City GPS)' },
                  { id: 'array', name: '🚗 Array (Parking Lot)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setActiveDS(m.id); sfx.playFlick(); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition whitespace-nowrap ${
                      activeDS === m.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}

              {activeSection === 'algo' &&
                [
                  { id: 'bubble', name: '🫧 Bubble Sort (Bubbles)' },
                  { id: 'insertion', name: '🃏 Insertion Sort (Playing Cards)' },
                  { id: 'selection', name: '🍎 Selection Sort (Apple Grader)' },
                  { id: 'quick', name: '🧳 Quick Sort (Airport Luggage)' },
                  { id: 'merge', name: '📦 Merge Sort (Zipper Conveyor)' },
                  { id: 'race', name: '🏁 Algorithm Race Duel' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setActiveAlgo(m.id); sfx.playFlick(); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition whitespace-nowrap ${
                      activeAlgo === m.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}

              {activeSection === 'sys' &&
                [
                  { id: 'cache', name: '⚡ L1 CPU Cache Locality (Array vs Linked List)' },
                  { id: 'stackmem', name: '🧠 x86-64 Virtual Memory & Call Stack' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { setActiveSys(m.id); sfx.playFlick(); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition whitespace-nowrap ${
                      activeSys === m.id
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 bg-[#0f172a] border border-slate-800 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
                  {activeSection === 'ds' && activeDS === 'stack' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={bookInput}
                        onChange={(e) => setBookInput(e.target.value)}
                        placeholder="Book title"
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-32"
                      />
                      <button onClick={handlePushBook} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs hover:bg-cyan-300">
                        ➕ Push Book (TOP)
                      </button>
                      <button onClick={handlePopBook} className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs hover:bg-rose-500/30">
                        ➖ Pop Book
                      </button>
                      <button onClick={handlePeekBook} className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs">
                        👁️ Peek Top
                      </button>
                      <button
                        onClick={() => { setBooks(['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5']); sfx.playFlick(); }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        ↺ Reset
                      </button>
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'queue' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={queueNameInput}
                        onChange={(e) => setQueueNameInput(e.target.value)}
                        placeholder="Customer Name"
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white w-32"
                      />
                      <button onClick={handleEnqueuePerson} className="px-3 py-1.5 rounded-lg bg-purple-500 text-white font-extrabold text-xs hover:bg-purple-400">
                        ➕ Enqueue (Join REAR)
                      </button>
                      <button onClick={handleDequeuePerson} className="px-3 py-1.5 rounded-lg bg-teal-400 text-slate-950 font-extrabold text-xs hover:bg-teal-300">
                        ☕ Dequeue (Serve FRONT)
                      </button>
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'linkedlist' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="number"
                        value={trainInputVal}
                        onChange={(e) => setTrainInputVal(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white w-20"
                      />
                      <button onClick={handleTrainPrepend} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white font-bold text-xs">
                        ⏮ Prepend Head
                      </button>
                      <button onClick={handleTrainAppend} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs">
                        ➕ Append Tail
                      </button>
                      <button onClick={handleTrainInsertAt} className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400 text-indigo-300 font-bold text-xs">
                        🔧 Splice at Idx 2
                      </button>
                      <button onClick={handleTrainRemoveLast} className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs">
                        ❌ Uncouple Tail
                      </button>
                      <button onClick={handleTrainTraverse} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs">
                        🔦 Traverse Pointers
                      </button>
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'tree' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => runTreeTraversal('in')} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs">
                        🍃 In-Order (Sorted)
                      </button>
                      <button onClick={() => runTreeTraversal('pre')} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white font-bold text-xs">
                        🌿 Pre-Order (Root First)
                      </button>
                      <button onClick={() => runTreeTraversal('post')} className="px-3 py-1.5 rounded-lg bg-purple-500 text-white font-bold text-xs">
                        🍂 Post-Order (Leaves First)
                      </button>
                      <button onClick={() => runTreeTraversal('bfs')} className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold text-xs">
                        🌊 Level-Order (BFS)
                      </button>
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'avl' && (
                    <div className="text-xs font-bold text-slate-300">
                      Self-Balancing AVL Tree: Guarantees worst-case O(log n) search by keeping |BF| ≤ 1.
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'graph' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 font-bold">Route:</span>
                      <select
                        value={`${graphStart}-${graphEnd}`}
                        onChange={(e) => {
                          const [s, t] = e.target.value.split('-');
                          setGraphStart(s);
                          setGraphEnd(t);
                        }}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="library-airport">Library → Airport</option>
                        <option value="park-hospital">Park → Hospital</option>
                        <option value="library-hospital">Library → Hospital</option>
                        <option value="park-airport">Park → Airport</option>
                      </select>
                      <button onClick={() => runCityGraphRoute('dijkstra')} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs">
                        🚗 Find Dijkstra Shortest Path
                      </button>
                      <button onClick={() => runCityGraphRoute('bfs')} className="px-3 py-1.5 rounded-lg bg-purple-500 text-white font-bold text-xs">
                        🌐 Run BFS Exploration
                      </button>
                    </div>
                  )}

                  {activeSection === 'ds' && activeDS === 'array' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Insert at Bay:</span>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        value={arrayShiftIdx}
                        onChange={(e) => setArrayShiftIdx(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white w-16"
                      />
                      <button onClick={handleArrayShiftInsert} className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs">
                        ➕ Insert Car & Shift Right O(n)
                      </button>
                      <button
                        onClick={() => { setParkingCars(initialCars); setSelectedBay(3); sfx.playFlick(); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        ↺ Reset Lot
                      </button>
                    </div>
                  )}

                  {activeSection === 'algo' && activeAlgo !== 'race' && (
                    <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setIsSortPlaying(false);
                            setSortStepIdx((p) => Math.max(0, p - 1));
                            sfx.playFlick();
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                          title="Step Backward"
                        >
                          <SkipBack className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (sortStepIdx >= sortSnapshots.length - 1) setSortStepIdx(0);
                            setIsSortPlaying(!isSortPlaying);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-cyan-300"
                        >
                          {isSortPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          <span>{isSortPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsSortPlaying(false);
                            setSortStepIdx((p) => Math.min(sortSnapshots.length - 1, p + 1));
                            sfx.playFlick();
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                          title="Step Forward"
                        >
                          <SkipForward className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setIsSortPlaying(false); setSortStepIdx(0); sfx.playFlick(); }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Reset to Step 0"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setIsSortPlaying(false);
                            setSortRawArr(Array.from({ length: 8 }, () => Math.floor(Math.random() * 75 + 15)));
                            setSortStepIdx(0);
                            sfx.playFlick();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 flex items-center gap-1"
                        >
                          <Shuffle className="w-3.5 h-3.5" />
                          <span>Randomize</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsSortPlaying(false);
                            setSortRawArr([92, 81, 68, 57, 45, 34, 23, 14]);
                            setSortStepIdx(0);
                            sfx.playFlick();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300"
                        >
                          📉 Reversed (Worst Case)
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'algo' && activeAlgo === 'race' && (
                    <div className="flex flex-wrap items-center justify-between gap-2 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={raceAlgoA}
                          onChange={(e) => { setIsRacing(false); setRaceStep(0); setRaceAlgoA(e.target.value); }}
                          className="bg-slate-950 border border-cyan-500/50 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-bold"
                        >
                          <option value="quick">Lane A: Quick Sort</option>
                          <option value="merge">Lane A: Merge Sort</option>
                          <option value="insertion">Lane A: Insertion Sort</option>
                        </select>
                        <span className="text-xs font-black text-slate-500">VS</span>
                        <select
                          value={raceAlgoB}
                          onChange={(e) => { setIsRacing(false); setRaceStep(0); setRaceAlgoB(e.target.value); }}
                          className="bg-slate-950 border border-purple-500/50 rounded-lg px-2.5 py-1.5 text-xs text-purple-300 font-bold"
                        >
                          <option value="bubble">Lane B: Bubble Sort</option>
                          <option value="selection">Lane B: Selection Sort</option>
                          <option value="insertion">Lane B: Insertion Sort</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setRaceStep(0); setIsRacing(true); }}
                          className="px-4 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-extrabold text-xs"
                        >
                          🏁 Start Synchronous Duel
                        </button>
                        <button
                          onClick={() => {
                            setIsRacing(false);
                            setRaceStep(0);
                            setRaceArr(Array.from({ length: 10 }, () => Math.floor(Math.random() * 80 + 15)));
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300"
                        >
                          🎲 New Dataset
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'sys' && activeSys === 'cache' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => runHardwareCacheSim('array')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-extrabold text-xs"
                      >
                        ⚡ Simulate Array Traversal (87.5% Cache Hits)
                      </button>
                      <button
                        onClick={() => runHardwareCacheSim('ll')}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-500 text-white font-extrabold text-xs"
                      >
                        🐢 Simulate Linked List Traversal (100% Cache Misses)
                      </button>
                    </div>
                  )}

                  {activeSection === 'sys' && activeSys === 'stackmem' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          if (callFrames.length >= 6) {
                            sfx.playCacheMiss();
                            setCallFrames([...callFrames, { fn: 'recurse(∞) — GUARD PAGE BREACH', rsp: '0x7FFF_DD00', vars: 'SIGSEGV: STACK OVERFLOW', status: 'overflow' }]);
                            setLogMsg('💥 SIGSEGV: Stack Pointer (RSP) collided with guard page! Stack Overflow.');
                            return;
                          }
                          sfx.playThud();
                          setCallFrames([
                            ...callFrames,
                            { fn: `recurse(depth=${callFrames.length})`, rsp: `0x7FFF_DD${80 - callFrames.length * 10}`, vars: 'ret_addr, local_buf[64]', status: 'active' }
                          ]);
                          setLogMsg('Allocated new x86-64 Call Stack Frame. RSP register decremented by 32 bytes.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-extrabold text-xs"
                      >
                        ➕ Push Stack Frame (Call Function)
                      </button>
                      <button
                        onClick={() => {
                          if (callFrames.length <= 1) return;
                          sfx.playPop();
                          setCallFrames(callFrames.slice(0, -1));
                          setLogMsg('Function returned. Stack frame popped by incrementing RSP.');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-400 text-rose-300 font-bold text-xs"
                      >
                        ➖ Pop Frame (Return)
                      </button>
                    </div>
                  )}
                </div>

                <div className="min-h-[410px] bg-[#070b14] border border-slate-800/90 rounded-xl flex items-center justify-center relative overflow-hidden">
                  {activeSection === 'ds' && activeDS === 'stack' && renderStackStage()}
                  {activeSection === 'ds' && activeDS === 'queue' && renderQueueStage()}
                  {activeSection === 'ds' && activeDS === 'linkedlist' && renderLinkedListStage()}
                  {activeSection === 'ds' && activeDS === 'tree' && renderTreeStage()}
                  {activeSection === 'ds' && activeDS === 'avl' && renderAVLStage()}
                  {activeSection === 'ds' && activeDS === 'graph' && renderGraphStage()}
                  {activeSection === 'ds' && activeDS === 'array' && renderArrayStage()}
                  {activeSection === 'algo' && renderSortingStage()}
                  {activeSection === 'sys' && renderSystemsStage()}
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-200 font-medium leading-relaxed">{logMsg}</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-5">
                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span>Live Execution Telemetry</span>
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {telemetry.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-2.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400">{telemetry.label1}</div>
                      <div className="text-sm font-black font-mono text-white mt-0.5">{telemetry.val1}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-2.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400">{telemetry.label2}</div>
                      <div className="text-sm font-black font-mono text-cyan-300 mt-0.5">{telemetry.val2}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800/90 rounded-xl p-2.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400">{telemetry.label3}</div>
                      <div className="text-sm font-black font-mono text-purple-300 mt-0.5">{telemetry.val3}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-purple-400" />
                    <span>Asymptotic Complexity Profile</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-slate-400">Best Time:</span>
                      <span className="font-mono font-bold text-emerald-400">{complexity.best}</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-slate-400">Avg Time:</span>
                      <span className="font-mono font-bold text-cyan-400">{complexity.avg}</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-slate-400">Worst Time:</span>
                      <span className="font-mono font-bold text-rose-400">{complexity.worst}</span>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 flex justify-between">
                      <span className="text-slate-400">Aux Space:</span>
                      <span className="font-mono font-bold text-amber-300">{complexity.space}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 shadow-xl flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-amber-400" />
                      <span>Code-to-State Step Debugger</span>
                    </span>
                    <span className="text-[10px] font-mono bg-slate-900 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
                      Line #{activeCodeLine + 1}
                    </span>
                  </div>
                  <div className="bg-[#070b14] border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-1 overflow-x-auto flex-1">
                    {codeLines.map((line, idx) => (
                      <div
                        key={idx}
                        className={`px-2 py-0.5 rounded transition-colors whitespace-pre ${
                          idx === activeCodeLine
                            ? 'bg-cyan-500/20 text-white font-bold border-l-2 border-cyan-400'
                            : 'text-slate-400'
                        }`}
                      >
                        <span className="text-slate-600 select-none mr-3">{idx + 1}</span>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {showPromptModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">
                  Master Architectural Prompt for Gemini (React + Refined Graphics)
                </h3>
              </div>
              <button
                onClick={() => setShowPromptModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                ✕ Close
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 overflow-y-auto max-h-80 whitespace-pre-wrap leading-relaxed">
              {GEMINI_MASTER_PROMPT}
            </pre>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCopyPrompt}
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-cyan-300"
              >
                {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPrompt ? 'Copied to Clipboard!' : 'Copy Full Prompt'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
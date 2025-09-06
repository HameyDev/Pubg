import { GeneratedName } from "@shared/schema";
import { randomUUID } from "crypto";

// Unicode character mappings for different styles
const unicodeStyles = {
  boldSerifMath: {
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
  },
  
  italicSerifMath: {
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
  },
  
  boldItalicSerifMath: {
    'a': '𝒂', 'b': '𝒃', 'c': '𝒄', 'd': '𝒅', 'e': '𝒆', 'f': '𝒇', 'g': '𝒈', 'h': '𝒉', 'i': '𝒊', 'j': '𝒋', 'k': '𝒌', 'l': '𝒍', 'm': '𝒎', 'n': '𝒏', 'o': '𝒐', 'p': '𝒑', 'q': '𝒒', 'r': '𝒓', 's': '𝒔', 't': '𝒕', 'u': '𝒖', 'v': '𝒗', 'w': '𝒘', 'x': '𝒙', 'y': '𝒚', 'z': '𝒛',
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯',# thoughts

I need to create a PUBG stylish name generator web application similar to LingoJam's version. This will be a fullstack application with:

1. **Frontend Features**:
   - Dark gaming-themed UI with neon/glow effects
   - Real-time Unicode text transformation
   - Pre-made stylish names collection (100+ names from the source)
   - Copy-to-clipboard functionality
   - Search and filter capabilities
   - Favorites system
   - Mobile-responsive design

2. **Backend Features**:
   - Unicode character mapping utilities
   - Pre-made names data storage
   - Favorites management API

3. **Key Technical Requirements**:
   - Use React with Tailwind CSS and Shadcn UI
   - Implement Unicode transformations for stylish text generation
   - Store pre-made names from the LingoJam source data
   - Real-time text generation as user types
   - Category-based filtering (Cool, Aggressive, Royal, Symbols, etc.)

The design reference shows a modern gaming interface with dark backgrounds, cyan/blue primary colors, lime green secondary colors, and purple accents. I'll need to preserve all the visual elements including the glow effects, gradients, and gaming aesthetics.

# useful_guidelines_from_blueprints

- Always follow modern web application patterns and best-practices
- Put as much of the app in the frontend as possible. The backend should only be responsible for data persistence and making API calls
- Minimize the number of files. Collapse similar components into a single file
- Always prefer using in-memory storage (MemStorage) unless asked to use a database
- Use wouter for routing on the frontend
- Always use @tanstack/react-query when fetching data
- Use shadcn's useForm hook and Form component for forms
- Use icons from lucide-react to signify actions and provide visual cues
- When defining custom properties in index.css, always use the proper HSL format like hsl(20, 14.3%, 4.1%) for colors

# directory_structure

```json
[
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/storage.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/index.css", "status": "overwritten"},
    {"path": "tailwind.config.ts", "status": "overwritten"},
    {"path": "client/src/pages/home.tsx", "status": "new"},
    {"path": "client/src/lib/unicode-transforms.ts", "status": "new"},
    {"path": "client/src/data/premade-names.ts", "status": "new"},
    {"path": "client/src/components/name-generator.tsx", "status": "new"},
    {"path": "client/src/components/premade-names.tsx", "status": "new"},
    {"path": "client/src/components/copy-toast.tsx", "status": "new"}
]

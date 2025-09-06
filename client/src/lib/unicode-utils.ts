// Unicode character mappings for different styles
const unicodeMappings = {
  bold: {
    'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
    'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳'
  },
  italic: {
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅', 'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍',
    'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ', 'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞', 'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧'
  },
  boldItalic: {
    'A': '𝑨', 'B': '𝑩', 'C': '𝑪', 'D': '𝑫', 'E': '𝑬', 'F': '𝑭', 'G': '𝑮', 'H': '𝑯', 'I': '𝑰', 'J': '𝑱', 'K': '𝑲', 'L': '𝑳', 'M': '𝑴', 'N': '𝑵', 'O': '𝑶', 'P': '𝑷', 'Q': '𝑸', 'R': '𝑹', 'S': '𝑺', 'T': '𝑻', 'U': '𝑼', 'V': '𝑽', 'W': '𝑾', 'X': '𝑿', 'Y': '𝒀', 'Z': '𝒁',
    'a': '𝒂', # thoughts

I need to create a PUBG stylish name generator that matches the design reference and follows all the specified requirements. This will be a React-based application with a gaming-themed dark interface. The key functionality includes:

1. Real-time text conversion to Unicode styled characters
2. Pre-made collection of 100+ stylish names from the provided source
3. Copy-to-clipboard functionality
4. Search and filter capabilities
5. Favorites system
6. Name history
7. Mobile-responsive design

The design uses a dark gaming theme with vibrant accent colors (cyan primary, lime secondary, purple accent). I'll need to implement Unicode character mapping utilities for text conversion and organize the pre-made names by categories.

Based on the provided source data, I have access to authentic PUBG names with symbols and special characters that I can categorize and implement.

# useful_guidelines_from_blueprints

From the development guidelines:
- Put as much of the app in the frontend as possible, backend only for data persistence
- Use in-memory storage (MemStorage) unless database is requested
- Use wouter for routing, shadcn components, and TanStack Query for data fetching
- Add data-testid attributes to interactive elements
- Use proper HSL format for colors in index.css
- Follow the exact color scheme from the design reference

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
    {"path": "client/src/lib/unicode-converter.ts", "status": "new"},
    {"path": "client/src/lib/premade-names.ts", "status": "new"},
    {"path": "client/src/components/name-generator.tsx", "status": "new"},
    {"path": "client/src/components/premade-names.tsx", "status": "new"},
    {"path": "client/src/components/copy-toast.tsx", "status": "new"}
]

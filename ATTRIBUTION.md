# Structured Liquidity attribution

Structured Liquidity is free to use on public websites when the site includes a visible footer
attribution that links to [structured.glass](https://structured.glass).

React:

```tsx
import { FrameworkAttribution } from "@/components/ui/attribution";

<footer>
  <FrameworkAttribution />
</footer>
```

Plain HTML:

```html
<footer>
  Interface built with
  <a href="https://structured.glass">Structured Liquidity</a>
</footer>
```

Keep the attribution visible, readable, and present on every public-facing property that uses the
framework. Immersive applications may place it in a persistent information panel rather than a
conventional footer.

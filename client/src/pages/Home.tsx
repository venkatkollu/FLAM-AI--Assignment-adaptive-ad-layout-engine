import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Copy,
  Download,
  Eye,
  Frame,
  Grid3X3,
  Layers3,
  LayoutTemplate,
  Maximize2,
  Menu,
  MoreHorizontal,
  MousePointer2,
  PanelLeft,
  Play,
  Plus,
  Rocket,
  RotateCcw,
  Settings2,
  Share2,
  Sparkles,
  Square,
  TabletSmartphone,
  Type,
  WandSparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

type SurfaceId = "feed" | "story" | "billboard" | "square";

type Surface = {
  id: SurfaceId;
  label: string;
  meta: string;
  icon: typeof TabletSmartphone;
  width: number;
  height: number;
};

const surfaces: Surface[] = [
  { id: "feed", label: "Social feed", meta: "1:1 · 1080 × 1080", icon: Square, width: 1080, height: 1080 },
  { id: "story", label: "Story / Reels", meta: "9:16 · 1080 × 1920", icon: TabletSmartphone, width: 1080, height: 1920 },
  { id: "billboard", label: "Web billboard", meta: "16:9 · 1440 × 810", icon: Frame, width: 1440, height: 810 },
  { id: "square", label: "App placement", meta: "4:5 · 1080 × 1350", icon: LayoutTemplate, width: 1080, height: 1350 },
];

const colorOptions = [
  { value: "#d8ff35", name: "volt" },
  { value: "#ff845f", name: "coral" },
  { value: "#9e7bff", name: "iris" },
  { value: "#54dfc1", name: "mint" },
];

const starterHeadline = "Make room for\nwhat matters.";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatHeadline(value: string) {
  return value.split("\n").map((line, index) => (
    <span key={`${line}-${index}`} className="headline-line">
      {line}
    </span>
  ));
}

export default function Home() {
  const [activeSurface, setActiveSurface] = useState<SurfaceId>("feed");
  const [headline, setHeadline] = useState(starterHeadline);
  const [supportingCopy, setSupportingCopy] = useState("A calmer way to organize your everyday.");
  const [cta, setCta] = useState("Explore the collection");
  const [campaign, setCampaign] = useState("Quietly ahead");
  const [accent, setAccent] = useState("#d8ff35");
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [previewMode, setPreviewMode] = useState<"fit" | "actual">("fit");
  const [zoom, setZoom] = useState(72);
  const [displayType, setDisplayType] = useState("DM Sans / 700");
  const [cornerRadius, setCornerRadius] = useState("24 px / Soft");
  const [showInspectorMenu, setShowInspectorMenu] = useState(false);
  const campaignInputRef = useRef<HTMLInputElement>(null);

  const surface = surfaces.find((item) => item.id === activeSurface) ?? surfaces[0];
  const compositionLabel = useMemo(() => {
    if (activeSurface === "story") return "Vertical rhythm preserved";
    if (activeSurface === "billboard") return "Wide composition balanced";
    if (activeSurface === "square") return "Portrait crop protected";
    return "Primary composition locked";
  }, [activeSurface]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        campaignInputRef.current?.focus();
        campaignInputRef.current?.select();
      }
      if (event.key === "Escape") setShowInspectorMenu(false);
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const exportSpec = () => {
    const spec = {
      campaign,
      surface: surface.id,
      dimensions: `${surface.width}x${surface.height}`,
      copy: { headline, supportingCopy, cta },
      brand: { accent, safeZone: showSafeZone, grid: showGrid },
      generatedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(spec, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${campaign.toLowerCase().replace(/\s+/g, "-") || "ad-layout"}-spec.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Layout spec exported", { description: "Your adaptive composition is ready to hand off." });
  };

  const resetCanvas = () => {
    setHeadline(starterHeadline);
    setSupportingCopy("A calmer way to organize your everyday.");
    setCta("Explore the collection");
    setCampaign("Quietly ahead");
    setAccent("#d8ff35");
    setShowSafeZone(true);
    setShowGrid(false);
    setZoom(72);
    setDisplayType("DM Sans / 700");
    setCornerRadius("24 px / Soft");
    setShowInspectorMenu(false);
    toast("Canvas reset", { description: "Back to the starter composition." });
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark"><Sparkles size={15} strokeWidth={2.6} /></div>
          <span>northrange</span>
          <span className="brand-dot">/</span>
          <span className="brand-product">studio</span>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">Q</div>
          <div className="workspace-copy">
            <span className="eyebrow">Workspace</span>
            <strong>Quietly ahead</strong>
          </div>
          <ChevronDown size={16} className="muted-icon" />
        </div>

        <div className="sidebar-section-label">Build</div>
        <nav className="side-nav" aria-label="Workspace sections">
          <button className="side-nav-item active"><PanelLeft size={16} /><span>Composer</span><span className="nav-count">01</span></button>
          <button className="side-nav-item" onClick={() => toast("Library is ready for your next campaign") }><Layers3 size={16} /><span>Asset library</span></button>
          <button className="side-nav-item" onClick={() => toast("Templates are coming next") }><LayoutTemplate size={16} /><span>Templates</span></button>
        </nav>

        <div className="sidebar-section-label">Review</div>
        <nav className="side-nav" aria-label="Review sections">
          <button className="side-nav-item" onClick={() => toast("No pending review items") }><Eye size={16} /><span>Review queue</span><span className="nav-badge">3</span></button>
          <button className="side-nav-item" onClick={() => toast("Brand guardrails are synced") }><Settings2 size={16} /><span>Brand system</span></button>
        </nav>

        <div className="sidebar-spacer" />
        <div className="system-card">
          <div className="system-card-top"><span className="status-dot" /> <span>Adaptive engine</span><span className="live-pill">LIVE</span></div>
          <div className="system-stat-row"><span>Surfaces mapped</span><strong>04 / 04</strong></div>
          <div className="progress-line"><span style={{ width: "100%" }} /></div>
          <p>All constraints are passing. Ready for production.</p>
        </div>
        <div className="user-row">
          <div className="user-avatar">AL</div>
          <div><strong>Avery Lin</strong><span>Creative systems</span></div>
          <MoreHorizontal size={16} className="muted-icon" />
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Campaigns</span><span>/</span><strong>{campaign}</strong><span className="draft-chip">Draft</span></div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Help" onClick={() => toast("Tip: switch surfaces to see the layout engine adapt in real time") }><CircleHelp size={17} /></button>
            <button className="icon-button has-dot" aria-label="Notifications" onClick={() => toast("You’re all caught up") }><Bell size={17} /></button>
            <button className="share-button" onClick={() => toast.success("Share link copied", { description: "Anyone with the link can view this draft." })}><Share2 size={15} /> Share</button>
            <button className="publish-button" onClick={() => toast.success("Ready to publish", { description: "The adaptive preflight passed all four surfaces." })}><Rocket size={15} /> Publish</button>
          </div>
        </header>

        <section className="editor-header">
          <div>
            <div className="kicker"><Zap size={13} fill="currentColor" /> Adaptive layout engine</div>
            <h1>Build once.<br /><em>Fit everywhere.</em></h1>
            <p className="editor-subtitle">One composition, intelligently reflowed across every surface your campaign needs.</p>
          </div>
          <div className="header-meta">
            <div className="meta-block"><span>Last saved</span><strong>Just now</strong></div>
            <div className="meta-divider" />
            <div className="meta-block"><span>Version</span><strong>v0.8.4</strong></div>
            <button className="round-action" onClick={resetCanvas} aria-label="Reset canvas"><RotateCcw size={16} /></button>
          </div>
        </section>

        <section className="surface-strip">
          <div className="strip-heading"><span className="section-index">01</span><div><strong>Choose a surface</strong><span>See how your composition adapts</span></div></div>
          <div className="surface-tabs">
            {surfaces.map((item) => {
              const Icon = item.icon;
              return <button key={item.id} className={cn("surface-tab", activeSurface === item.id && "active")} onClick={() => setActiveSurface(item.id)}><Icon size={16} /><span>{item.label}</span><small>{item.meta}</small></button>;
            })}
          </div>
        </section>

        <section className="workspace-grid">
          <div className="canvas-column">
            <div className="canvas-toolbar">
              <div className="canvas-title"><span className="live-indicator" /> <strong>{surface.label}</strong><span className="canvas-dimension">{surface.width} × {surface.height}</span></div>
              <div className="toolbar-controls">
                <button className={cn("toolbar-toggle", showGrid && "on")} onClick={() => setShowGrid(!showGrid)}><Grid3X3 size={14} /> Grid</button>
                <button className={cn("toolbar-toggle", showSafeZone && "on")} onClick={() => setShowSafeZone(!showSafeZone)}><Maximize2 size={14} /> Safe zone</button>
                <div className="toolbar-divider" />
                <button className={cn("mode-button", previewMode === "fit" && "active")} onClick={() => setPreviewMode("fit")}>Fit</button>
                <button className={cn("mode-button", previewMode === "actual" && "active")} onClick={() => setPreviewMode("actual")}>100%</button>
              </div>
            </div>

            <div className={cn("canvas-stage", showGrid && "show-grid")}>
              <div className={cn("ad-preview", `surface-${activeSurface}`, previewMode === "actual" && "actual-preview")} style={{ "--accent": accent, "--zoom": zoom / 72, "--radius": cornerRadius.startsWith("16") ? "16px" : cornerRadius.startsWith("32") ? "32px" : "24px", "--display-font": displayType.startsWith("Space") ? "'Space Grotesk', sans-serif" : "'DM Sans', sans-serif" } as React.CSSProperties}>
                <div className="ad-grain" />
                <div className="ad-orbit orbit-one" />
                <div className="ad-orbit orbit-two" />
                <div className="ad-topline"><span className="ad-brand"><span className="brand-mini-mark">N</span> NORTHRANGE</span><span className="ad-issue">ISSUE / 04</span></div>
                <div className="ad-content">
                  <span className="ad-overline">A little more margin</span>
                  <h2>{formatHeadline(headline)}</h2>
                  <p>{supportingCopy}</p>
                  <button className="ad-cta" style={{ backgroundColor: accent }} onClick={() => toast("Preview CTA clicked")}>{cta}<ArrowUpRight size={15} /></button>
                </div>
                <div className="ad-footer"><span>northrange.studio</span><span className="footer-mark"><span /> <span /> <span /></span></div>
                {showSafeZone && <div className="safe-zone"><span>SAFE ZONE</span></div>}
                {activeSurface === "story" && <div className="story-progress"><span style={{ backgroundColor: accent, width: "38%" }} /></div>}
                {activeSurface === "billboard" && <div className="billboard-tag">MOMENTUM<br /><span>WITHOUT THE NOISE</span></div>}
              </div>
              <div className="stage-caption"><span>{compositionLabel}</span><span>⌘ + drag to reposition</span></div>
            </div>
            <div className="zoom-control"><span>Zoom</span><input aria-label="Preview zoom" type="range" min="40" max="100" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /><strong>{zoom}%</strong><button className="zoom-reset" onClick={() => setZoom(72)} aria-label="Reset zoom">Reset</button></div>
          </div>

          <aside className="inspector">
            <div className="inspector-heading"><div><span className="section-index">02</span><h2>Composition</h2></div><div className="inspector-menu-wrap"><button className="more-button" aria-label="More composition options" onClick={() => setShowInspectorMenu(!showInspectorMenu)}><MoreHorizontal size={17} /></button>{showInspectorMenu && <div className="inspector-menu"><button onClick={() => { setHeadline(starterHeadline); setShowInspectorMenu(false); toast("Headline restored"); }}>Restore headline</button><button onClick={() => { navigator.clipboard?.writeText(JSON.stringify({ campaign, headline, supportingCopy, cta })); setShowInspectorMenu(false); toast.success("Copy spec copied"); }}>Copy copy spec</button></div>}</div></div>
            <p className="inspector-note">Edit the source content. The engine will protect hierarchy as the surface changes.</p>

            <div className="inspector-group">
              <label htmlFor="campaign">Campaign name</label>
              <div className="input-wrap"><input ref={campaignInputRef} id="campaign" value={campaign} onChange={(event) => setCampaign(event.target.value)} /><span className="input-hint">⌘ K</span></div>
            </div>
            <div className="inspector-group">
              <div className="label-row"><label htmlFor="headline">Headline</label><span className="character-count">{headline.length}/48</span></div>
              <textarea id="headline" rows={3} maxLength={48} value={headline} onChange={(event) => setHeadline(event.target.value)} />
              <div className="field-tip"><WandSparkles size={13} /> <span>Hierarchy protected across 4 surfaces</span></div>
            </div>
            <div className="inspector-group">
              <label htmlFor="supporting">Supporting copy</label>
              <textarea id="supporting" rows={2} maxLength={96} value={supportingCopy} onChange={(event) => setSupportingCopy(event.target.value)} />
            </div>
            <div className="inspector-group">
              <label htmlFor="cta">Call to action</label>
              <div className="input-wrap"><input id="cta" value={cta} onChange={(event) => setCta(event.target.value)} /><MousePointer2 size={14} className="input-icon" /></div>
            </div>

            <div className="inspector-divider" />
            <div className="inspector-heading compact"><div><span className="section-index">03</span><h2>Brand tokens</h2></div><button className="text-button" onClick={() => toast("Brand tokens synced from Quietly ahead")}>Sync</button></div>
            <div className="color-row"><div><label>Accent color</label><span className="color-value">{accent.toUpperCase()}</span></div><div className="color-swatches">{colorOptions.map((color) => <button key={color.value} className={cn("color-swatch", accent === color.value && "selected")} style={{ backgroundColor: color.value }} aria-label={`Use ${color.name} accent`} onClick={() => setAccent(color.value)} />)}</div></div>
            <label className="token-row token-select"><div className="token-icon"><Type size={15} /></div><div><span>Display type</span><strong>{displayType}</strong></div><select aria-label="Display type" value={displayType} onChange={(event) => setDisplayType(event.target.value)}><option>DM Sans / 700</option><option>Space Grotesk / 600</option><option>DM Sans / 600</option></select><ChevronDown size={15} className="muted-icon" /></label>
            <label className="token-row token-select"><div className="token-icon"><Frame size={15} /></div><div><span>Corner radius</span><strong>{cornerRadius}</strong></div><select aria-label="Corner radius" value={cornerRadius} onChange={(event) => setCornerRadius(event.target.value)}><option>16 px / Tight</option><option>24 px / Soft</option><option>32 px / Round</option></select><ChevronDown size={15} className="muted-icon" /></label>

            <div className="inspector-divider" />
            <div className="preflight"><div className="preflight-heading"><span className="status-dot" /><strong>Preflight passed</strong><span>4 / 4</span></div><p>Contrast, safe areas, and text overflow are all within spec.</p><button onClick={() => toast.success("All checks passed", { description: "Your composition is ready for handoff." })}>View checks <ArrowUpRight size={13} /></button></div>
            <button className="export-button" onClick={exportSpec}><Download size={15} /> Export layout spec <span>↗</span></button>
          </aside>
        </section>

        <section className="bottom-insight"><div className="insight-icon"><Sparkles size={16} /></div><div><strong>Smart reflow is doing the heavy lifting.</strong><span>Try switching between surfaces to see protected hierarchy in action.</span></div><button onClick={() => toast("Adaptive reflow maps headline, copy, CTA, and safe areas per surface")}>How it works <ArrowUpRight size={14} /></button></section>
        <footer className="page-footer"><span>northrange studio · frontend R&D assignment</span><span><Copy size={12} /> Built for systems that scale</span></footer>
      </main>
    </div>
  );
}

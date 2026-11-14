import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import chromiteImg from "@/assets/mineral-chromite.jpg";
import copperImg from "@/assets/mineral-copper.jpg";
import lithiumImg from "@/assets/mineral-lithium.jpg";
import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro } from "@/components/site/PageIntro";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/minerals")({
  head: () => ({
    meta: [
      { title: "Critical Minerals — Copper, Chromite, Lithium | TechMining" },
      {
        name: "description",
        content:
          "Pakistan's critical mineral belts: copper & gold in Chagai and Reko Diq, chromite in Muslim Bagh and Zhob, lithium & rare earths in KP and Gilgit.",
      },
      { property: "og:title", content: "Critical Minerals — Copper, Chromite, Lithium | TechMining" },
      {
        property: "og:description",
        content: "Where Pakistan's critical minerals are — and what the world needs them for.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Minerals,
});

const MINERALS = [
  {
    id: "copper",
    name: "Copper & Gold",
    region: "Chagai · Reko Diq · Saindak",
    img: copperImg,
    alt: "Copper ore specimen with green malachite and bornite",
    body: "The Tethyan porphyry belt hosts one of the world's largest undeveloped copper-gold deposits. Copper is the wiring of AI data centres, EV motors and national power grids.",
    uses: ["AI chips & data centres", "Power grids", "EV motors"],
    facts: [
      ["Deposit type", "Porphyry Cu-Au"],
      ["Key signal", "Phyllic alteration"],
    ],
  },
  {
    id: "chromite",
    name: "Chromite",
    region: "Muslim Bagh · Zhob · Lasbela",
    img: chromiteImg,
    alt: "Black metallic chromite ore specimen",
    body: "Podiform chromite in Balochistan's ophiolites is high-grade metallurgical ore — the base of stainless steel and superalloys used in aerospace and defence.",
    uses: ["Aerospace superalloys", "Defence steel", "Stainless steel"],
    facts: [
      ["Export spec", "40–48% Cr₂O₃"],
      ["Host rock", "Serpentinised peridotite"],
    ],
  },
  {
    id: "lithium",
    name: "Lithium & Rare Earths",
    region: "Khyber Pakhtunkhwa · Gilgit-Baltistan",
    img: lithiumImg,
    alt: "Pink spodumene and lilac lepidolite lithium mineral specimens",
    body: "Pegmatite fields in the northern ranges carry spodumene, lepidolite and rare-earth bearing minerals — feedstock for next-generation solid-state batteries.",
    uses: ["Solid-state batteries", "Permanent magnets", "Grid storage"],
    facts: [
      ["Deposit type", "LCT pegmatite"],
      ["Key minerals", "Spodumene, lepidolite"],
    ],
  },
];

function Minerals() {
  return (
    <>
      <PageIntro label="Critical minerals" title="What lies under Balochistan and the north.">
        Three mineral systems Pakistan can bring to a supply chain the world is rebuilding.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <Tabs defaultValue="copper">
          <TabsList>
            {MINERALS.map((m) => (
              <TabsTrigger key={m.id} value={m.id}>
                {m.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {MINERALS.map((m) => (
            <TabsContent key={m.id} value={m.id} className="mt-8 animate-rise">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                <img
                  src={m.img}
                  alt={m.alt}
                  width={1024}
                  height={800}
                  loading="lazy"
                  className="aspect-[5/4] w-full rounded-[28px] object-cover"
                />
                <div className="self-center">
                  <p className="flex items-center gap-2 type-label-lg text-primary">
                    <MapPin className="size-4" /> {m.region}
                  </p>
                  <h2 className="mt-3 type-display-md">{m.name}</h2>
                  <p className="mt-4 type-body-lg text-muted-foreground">{m.body}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {m.uses.map((u) => (
                      <span
                        key={u}
                        className="rounded-sm bg-secondary px-3 py-1.5 type-label-lg text-secondary-foreground"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                  <dl className="mt-8 grid grid-cols-2 gap-3">
                    {m.facts.map(([k, v]) => (
                      <div key={k} className="card-filled p-4">
                        <dt className="type-label-sm uppercase text-muted-foreground">{k}</dt>
                        <dd className="mt-1 type-title-md">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <CtaBand
        title="Exporting copper, chromite or lithium?"
        body="Grade control and verified dispatch records make your cargo easier to finance and harder to reject."
      />
    </>
  );
}

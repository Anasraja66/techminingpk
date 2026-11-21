import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageIntro } from "@/components/site/PageIntro";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Request an Area Audit — TechMining Global" },
      {
        name: "description",
        content:
          "Request a TechMining Global Area Audit or Mineral Intelligence Pilot for a concession in any country.",
      },
      { property: "og:title", content: "Request an Area Audit — TechMining Global" },
      {
        property: "og:description",
        content: "Send your area — get a prospectivity map and reviewed zones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const MINERALS = ["Copper / Gold", "Chromite", "Lithium / Rare earths", "Gemstones", "Coal", "Marble / Granite", "Other"];

function Contact() {
  const [mineral, setMineral] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!mineral) {
      toast.error("Please choose a mineral type.");
      return;
    }
    setSent(true);
    toast.success("Request received. We'll be in touch within one working day.");
  }

  return (
    <>
      <PageIntro label="Contact" title="Request an Area Audit or a pilot.">
        Tell us where your ground is and what you are looking for. We work with concessions in any
        country.
      </PageIntro>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[28px] border border-outline-variant bg-surface-lowest p-6 sm:p-8">
          {sent ? (
            <div className="flex flex-col items-start gap-4 py-10">
              <span className="grid size-14 place-items-center rounded-full bg-success-container text-on-success-container">
                <CheckCircle2 className="size-7" />
              </span>
              <h2 className="type-headline-sm">Thank you — we've got it.</h2>
              <p className="max-w-md type-body-lg text-muted-foreground">
                We'll be in touch within one working day to scope your area.
              </p>
              <Button variant="tonal" onClick={() => setSent(false)}>
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required autoComplete="name" placeholder="Muhammad Asif" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" required autoComplete="country-name" placeholder="e.g. Pakistan, Zambia, Chile" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="concession">Concession / area</Label>
                <Input id="concession" name="concession" required placeholder="Licence no., district or coordinates" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mineral">Mineral type</Label>
                <Select value={mineral} onValueChange={setMineral}>
                  <SelectTrigger id="mineral">
                    <SelectValue placeholder="Select mineral" />
                  </SelectTrigger>
                  <SelectContent>
                    {MINERALS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="reach">Phone or email</Label>
                <Input id="reach" name="reach" required placeholder="Phone with country code, or email" />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 sm:col-span-2">
                <Button type="submit" size="lg">
                  Send request
                </Button>
                <p className="type-body-md text-muted-foreground">No obligation. We reply within a working day.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-3">
          {[
            { icon: MapPin, title: "Coverage", body: "Area Audits in any country · Pakistan hubs" },
            { icon: Clock, title: "Response time", body: "Within one working day" },
            { icon: Phone, title: "Services", body: "Area Audit · Mineral Intelligence Pilot" },
          ].map((i) => (
            <div key={i.title} className="card-filled flex items-start gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary-container">
                <i.icon className="size-5" />
              </span>
              <div>
                <p className="type-title-md">{i.title}</p>
                <p className="type-body-md text-muted-foreground">{i.body}</p>
              </div>
            </div>
          ))}
        </aside>
      </section>
    </>
  );
}

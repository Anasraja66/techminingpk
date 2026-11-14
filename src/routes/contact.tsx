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
      { title: "Book a Site Audit — TechMining" },
      {
        name: "description",
        content:
          "Request a TechMining mine audit or live demo. Teams in Quetta, Islamabad and Karachi.",
      },
      { property: "og:title", content: "Book a Site Audit — TechMining" },
      {
        property: "og:description",
        content: "Request a mine audit or a live product demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const MINERALS = ["Copper / Gold", "Chromite", "Lithium / Rare earths", "Coal", "Marble / Granite", "Other"];

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
    toast.success("Request received. Our team will call you within one working day.");
  }

  return (
    <>
      <PageIntro label="Contact" title="Book a site audit or live demo.">
        Tell us where you mine and what you mine. A field engineer from our nearest office
        will reach out.
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
                Expect a call within one working day to schedule your audit.
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
                <Label htmlFor="concession">Mine concession / district</Label>
                <Input id="concession" name="concession" required placeholder="e.g. Muslim Bagh, Killa Saifullah" />
              </div>
              <div className="space-y-2">
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
                <Input id="reach" name="reach" required placeholder="+92 300 0000000 or you@company.pk" />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2 sm:col-span-2">
                <Button type="submit" size="lg">
                  Request audit
                </Button>
                <p className="type-body-md text-muted-foreground">No obligation. We reply within a working day.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-3">
          {[
            { icon: MapPin, title: "Offices", body: "Quetta · Islamabad · Karachi" },
            { icon: Clock, title: "Response time", body: "Within one working day" },
            { icon: Phone, title: "Field visits", body: "Balochistan, KP & Gilgit-Baltistan" },
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

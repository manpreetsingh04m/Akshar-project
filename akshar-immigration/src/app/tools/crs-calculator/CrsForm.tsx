"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateCrs,
  type CrsResult,
  type EducationLevel,
} from "@/lib/crs/calculate";
import { useMemo, useState } from "react";

const educationLevels: { value: EducationLevel; label: string }[] = [
  { value: "less-than-secondary", label: "Less than secondary" },
  { value: "secondary", label: "Secondary diploma" },
  { value: "one-year", label: "One-year post-secondary" },
  { value: "two-year", label: "Two-year post-secondary" },
  { value: "bachelors", label: "Bachelor's (3+ years)" },
  { value: "two-or-more", label: "Two or more credentials (one 3+ years)" },
  { value: "masters", label: "Master's / professional degree" },
  { value: "doctoral", label: "Doctoral (PhD)" },
];

export function CrsForm() {
  const [age, setAge] = useState("29");
  const [education, setEducation] = useState<EducationLevel>("bachelors");
  const [englishClb, setEnglishClb] = useState("9");
  const [canadianWorkYears, setCanadianWorkYears] = useState("0");
  const [hasSpouse, setHasSpouse] = useState(false);
  const [spouseEducation, setSpouseEducation] = useState<EducationLevel | "">(
    "",
  );
  const [spouseClb, setSpouseClb] = useState("");

  const result: CrsResult | null = useMemo(() => {
    const ageNum = Number(age);
    const clb = Number(englishClb);
    const work = Number(canadianWorkYears);
    if (!ageNum || ageNum < 17 || ageNum > 45) return null;
    if (!clb || clb < 4) return null;
    return calculateCrs({
      age: ageNum,
      education,
      englishClb: clb,
      canadianWorkYears: work,
      spouse: hasSpouse
        ? {
            education: spouseEducation || undefined,
            englishClb: spouseClb ? Number(spouseClb) : undefined,
          }
        : undefined,
    });
  }, [
    age,
    education,
    englishClb,
    canadianWorkYears,
    hasSpouse,
    spouseEducation,
    spouseClb,
  ]);

  const breakdownRows = result
    ? [
        { label: "Age", value: result.breakdown.age },
        { label: "Education", value: result.breakdown.education },
        { label: "First official language", value: result.breakdown.firstLanguage },
        { label: "Canadian work experience", value: result.breakdown.canadianWork },
        { label: "Spouse education", value: result.breakdown.spouseEducation },
        { label: "Spouse language", value: result.breakdown.spouseLanguage },
        {
          label: "Skill transferability (simplified)",
          value: result.breakdown.skillTransferability,
        },
      ]
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <Card className="border-[#EBE4D6] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-[#0B1F3A]">
            Your profile
          </CardTitle>
          <CardDescription>
            Estimates only — IRCC calculates CRS with full language grids and
            additional factors.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="crs-age">Age</Label>
            <Input
              id="crs-age"
              type="number"
              min={17}
              max={45}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="crs-clb">English CLB (representative)</Label>
            <Select
              value={englishClb}
              onValueChange={(v) => v != null && setEnglishClb(v)}
            >
              <SelectTrigger id="crs-clb" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    CLB {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="crs-edu">Education</Label>
            <Select
              value={education}
              onValueChange={(v) => setEducation(v as EducationLevel)}
            >
              <SelectTrigger id="crs-edu" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="crs-work">Canadian skilled work (years)</Label>
            <Select
              value={canadianWorkYears}
              onValueChange={(v) => v != null && setCanadianWorkYears(v)}
            >
              <SelectTrigger id="crs-work" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n === 5 ? "5+" : n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Checkbox
              id="crs-spouse"
              checked={hasSpouse}
              onCheckedChange={(v) => setHasSpouse(v === true)}
            />
            <Label htmlFor="crs-spouse" className="font-normal">
              Include spouse or common-law partner (simplified factors)
            </Label>
          </div>
          {hasSpouse && (
            <>
              <div className="space-y-2">
                <Label>Spouse education</Label>
                <Select
                  value={spouseEducation}
                  onValueChange={(v) =>
                    setSpouseEducation(v as EducationLevel)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationLevels.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Spouse English CLB</Label>
                <Select
                  value={spouseClb}
                  onValueChange={(v) => v != null && setSpouseClb(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    {[4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        CLB {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="h-fit border-[#0B1F3A] bg-[#0B1F3A] text-[#F7F3EB] shadow-lg">
        <CardHeader>
          <CardTitle className="font-serif text-lg text-[#C4A35A]">
            Estimated CRS
          </CardTitle>
          <CardDescription className="text-[#F7F3EB]/70">
            Express Entry range moves with each draw.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-serif text-5xl font-semibold tabular-nums">
            {result ? result.score : "—"}
          </p>
          <ul className="space-y-2 text-sm">
            {breakdownRows.map((row) => (
              <li
                key={row.label}
                className="flex justify-between border-b border-[#F7F3EB]/10 pb-1"
              >
                <span className="text-[#F7F3EB]/80">{row.label}</span>
                <span className="font-medium tabular-nums">{row.value}</span>
              </li>
            ))}
          </ul>
          <Button
            type="button"
            variant="outline"
            className="w-full border-[#C4A35A] bg-transparent text-[#F7F3EB] hover:bg-[#1A3358]"
            onClick={() => {
              window.location.href =
                "/tools/eligibility-checker?destination=canada&purpose=permanent-residence";
            }}
          >
            Discuss PR options
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

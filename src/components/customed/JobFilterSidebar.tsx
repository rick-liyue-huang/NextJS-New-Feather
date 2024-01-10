import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import prisma from '@/lib/prisma';

async function filterJobs(formData: FormData) {
  'use server';
}

export const JobFilterSidebar = async () => {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true }, // only return location
      distinct: ['location'], // only return distinct location
    })
    .then((locations: any) =>
      locations
        .map(({ location }: { location: any }) => location)
        .filter(Boolean)
    )) as string[];
  return (
    <aside className="md:w-[260px] p-3 sticky top-0 bg-background border rounded-lg h-fit">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, Company, etc" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={''}>
              <option value="">Anywhere</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </form>
    </aside>
  );
};

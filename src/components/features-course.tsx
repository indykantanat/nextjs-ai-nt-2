/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

type Props = {
  courses: any[];
}

const FeaturesCourse = ({ courses }: Props) => {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-sp6 sm:px-6 lg:px-8">
      <header className="border-b-5 border-foreground pb-sp3">
        <p className="rb-meta">[ 03 ] &mdash; CURRICULUM</p>
        <div className="mt-sp2 flex flex-wrap items-end justify-between gap-sp3">
          <h2 className="rb-h2">หลักสูตรทั้งหมด</h2>
          <p className="font-mono text-[15px] tracking-[1px] uppercase">
            {String(courses.length).padStart(3, "0")} COURSES
          </p>
        </div>
        <p className="mt-sp3 max-w-[60ch] text-[16px] leading-[1.6]">
          คัดสรรหลักสูตรคุณภาพสำหรับทุกระดับ เหมาะกับผู้ที่ต้องการเติมเต็มความรู้
        </p>
      </header>

      <div className="mt-sp5 grid grid-cols-1 gap-sp4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <article
            key={course.title}
            className="group flex flex-col border-3 border-foreground bg-card"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden border-b-3 border-foreground bg-sunken">
              <Image
                alt={course.title}
                className="size-full object-cover grayscale transition-[filter] duration-150 group-hover:grayscale-0"
                width={0}
                height={0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                src={course.picture}
                loading="eager"
              />
              <span className="absolute top-0 left-0 border-r-3 border-b-3 border-foreground bg-background px-2 py-1 font-mono text-[11px] font-bold tracking-[1px]">
                COURSE {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-sp3">
              <h3 className="rb-h4">{course.title}</h3>
              <p className="mt-sp3 border-t-3 border-foreground pt-sp2 text-[15px] leading-[1.5] text-muted-foreground">
                {course.detail}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCourse;

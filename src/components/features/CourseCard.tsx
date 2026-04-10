import { Course, CourseLevel } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

const levelVariant: Record<CourseLevel, "success" | "warning" | "accent"> = {
  [CourseLevel.Beginner]: "success",
  [CourseLevel.Intermediate]: "warning",
  [CourseLevel.Advanced]: "accent",
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card variant="bordered" hoverable padding="none">
      {/* Top gradient bar */}
      <div className="h-1.5 bg-gradient-to-r from-brand-500 to-accent-400" />

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={levelVariant[course.level]}>{course.level}</Badge>
          <span className="text-xs text-surface-400">{course.duration}</span>
        </div>

        <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 font-display">
          {course.title}
        </h3>

        <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700">
          <div>
            <span className="text-xl font-bold text-surface-900 dark:text-white">
              {formatCurrency(course.price)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-surface-500">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {course.rating}
            </span>
            <span>{course.enrolledCount} enrolled</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

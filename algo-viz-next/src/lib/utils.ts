import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Category} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDateTime(datetime: string) {
    const date = new Date(datetime);
    return Intl.DateTimeFormat('ban', {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Australia/Sydney",
    }).format(date);
}

export enum SortingState {
    NOT_SORTED,
    STARTED,
    SORTED
}

export function categoriesBreadcrumb(category: Category | null) {
    let items: { name: string, url: string, last: boolean }[] = [];

    while (category != null) {
        items.push({
            name: category.name,
            url: `/algorithms/categories/${category.slug}`,
            last: false
        });
        category = category.parent;
    }

    items.reverse();
    items[items.length - 1].last = true;

    return items;
}
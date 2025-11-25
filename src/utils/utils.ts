export default function classNames(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
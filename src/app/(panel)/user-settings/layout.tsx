import { Icon } from "@/components/shared";

type Props = { children: React.ReactNode };

export default async function SettingsLayout(props: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 container py-10">
        <Icon icon="edit-form" size={47} color="var(--color-accent_opacity)" />
      </div>

      <section className="flex-1 overflow-y-auto">{props.children}</section>
    </div>
  );
}

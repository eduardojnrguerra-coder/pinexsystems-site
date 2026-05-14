interface DemoRoleSwitcherProps {
  roles: string[];
  activeRole: string;
  onRoleChange: (role: string) => void;
  demoSlug?: string;
}

export function DemoRoleSwitcher({
  roles,
  activeRole,
  onRoleChange,
  demoSlug,
}: DemoRoleSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onRoleChange(role)}
          data-event="demo_role_switch"
          data-demo-slug={demoSlug}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9] ${
            activeRole === role
              ? "bg-white text-[#0b0c10]"
              : "border border-white/10 bg-white/[0.04] text-[#d8d8d2] hover:border-white/25"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}

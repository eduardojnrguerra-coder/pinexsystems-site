interface DemoRoleSwitcherProps {
  roles: string[];
  activeRole: string;
  onRoleChange: (role: string) => void;
}

export function DemoRoleSwitcher({
  roles,
  activeRole,
  onRoleChange,
}: DemoRoleSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onRoleChange(role)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
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

interface StepIndicatorProps {
  steps: readonly { title: string }[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  return (
    <div style={{ marginBottom: "var(--space-8)" }}>
      <div
        style={{
          height: 4,
          background: "var(--color-neutral-200)",
          borderRadius: "var(--radius-full)",
          marginBottom: "var(--space-4)",
          overflow: "hidden",
        }}
      >
        <div
          className="ui-step-progress-fill"
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "var(--color-primary-accessible)",
            borderRadius: "var(--radius-full)",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div
              key={step.title}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--space-2)",
                flex: 1,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  borderRadius: "var(--radius-full)",
                  fontSize: "var(--font-size-xs)",
                  fontWeight: 700,
                  background:
                    isComplete || isCurrent
                      ? "var(--color-primary-accessible)"
                      : "var(--color-neutral-200)",
                  color: isComplete || isCurrent ? "white" : "var(--color-text-tertiary)",
                }}
              >
                {isComplete ? "✓" : index + 1}
              </span>
            </div>
          );
        })}
      </div>
      <p
        role="status"
        style={{
          textAlign: "center",
          marginTop: "var(--space-2)",
          color: "var(--color-text-secondary)",
          fontSize: "var(--font-size-sm)",
        }}
      >
        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
      </p>
    </div>
  );
}

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "cn";

const inputVariants = cva(
    "w-full border-input min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 dark:bg-input/30 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    {
        variants: {
            variant: {
                default: "focus-visible:border-ring focus-visible:ring-ring/50",
                custom: "focus-visible:border-primary focus-visible:ring-primary",
            },
            size: {
                default: "h-9 px-2.5 py-1 text-base file:h-7 file:text-sm md:text-sm",
                sm: "h-8 px-2 py-1 text-sm file:h-6 file:text-xs",
                lg: "h-14 px-4 py-3 text-xl file:h-9 file:text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const inputLabelVariants = cva(
    "block font-semibold",
    {
        variants: {
            size: {
                default: "mb-1 text-sm",
                sm: "mb-1 text-xs",
                lg: "mb-1.5 text-lg",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

const inputErrorVariants = cva(
    "mt-1 text-destructive",
    {
        variants: {
            size: {
                default: "text-xs",
                sm: "text-[0.6875rem]",
                lg: "text-base",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
    label?: string;
    floatingLabel?: boolean;
    error?: string;
}

function Input({ className, type, label, floatingLabel = false, error, id, variant, size, ...props}: Readonly<InputProps>) {
    const inputId = id ?? React.useId();

    const [mostrarSenha, setMostrarSenha] = React.useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && mostrarSenha ? "text" : type;

    return (
        <div className="w-full">
            {!floatingLabel && label && (
                <label htmlFor={inputId} className={inputLabelVariants({ size })}>{label}</label>
            )}

            <div className="relative">
                <InputPrimitive
                    id={inputId}
                    type={inputType}
                    data-slot="input"
                    placeholder={floatingLabel ? " " : props.placeholder}
                    className={cn(
                        inputVariants({ variant, size }),
                        isPassword && "pr-10",
                        floatingLabel && "peer",
                        error && "border-destructive",
                        className,
                    )}
                    {...props}
                />

                {floatingLabel && label && (
                    <label htmlFor={inputId}
                        className={cn(
                            "pointer-events-none absolute top-1/2 -translate-y-1/2 bg-background text-muted-foreground transition-all",
                            size === "sm" && "left-2 px-0.5 text-xs",
                            size === "lg" && "left-3 px-1 text-base",
                            (!size || size === "default") && "left-2.5 px-1 text-sm",
                            "peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs",
                            "peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs",
                        )}
                    >{label}</label>
                )}

                {isPassword && (
                    <button type="button" onClick={() => setMostrarSenha((valor) => !valor)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                        aria-label={ mostrarSenha ? "Ocultar senha" : "Mostrar senha" }
                    >
                        {mostrarSenha ? ( <EyeOff className="size-4" />) : ( <Eye className="size-4" /> )}
                    </button>
                )}
            </div>

            <div className={cn(
                "min-h-6",
                size === "sm" && "min-h-5",
                size === "lg" && "min-h-8",
            )}>
                {error && ( <p className={inputErrorVariants({ size })}>{error}</p> )}
            </div>
        </div>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Input, inputVariants };

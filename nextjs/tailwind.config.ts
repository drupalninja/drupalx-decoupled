const defaultTheme = require('tailwindcss/defaultTheme')
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			typography: (theme: any) => ({
				DEFAULT: {
					css: {
						h1: {
							fontSize: theme('fontSize.4xl'),
							fontWeight: theme('fontWeight.bold'),
							lineHeight: theme('lineHeight.tight'),
							marginTop: theme('spacing.4'),
							marginBottom: theme('spacing.4'),
							color: theme('colors.gray.800'),
						},
						h2: {
							fontSize: theme('fontSize.3xl'),
							fontWeight: theme('fontWeight.semibold'),
							lineHeight: theme('lineHeight.tight'),
							marginTop: theme('spacing.3'),
							marginBottom: theme('spacing.3'),
							color: theme('colors.gray.800'),
						},
						h3: {
							fontSize: theme('fontSize.2xl'),
							fontWeight: theme('fontWeight.medium'),
							lineHeight: theme('lineHeight.tight'),
							marginTop: theme('spacing.2'),
							marginBottom: theme('spacing.2'),
							color: theme('colors.gray.800'),
						},
						h4: {
							fontSize: theme('fontSize.xl'),
							fontWeight: theme('fontWeight.medium'),
							marginTop: theme('spacing.2'),
							marginBottom: theme('spacing.2'),
							color: theme('colors.gray.800'),
						},
						h5: {
							fontSize: theme('fontSize.lg'),
							fontWeight: theme('fontWeight.normal'),
							marginTop: theme('spacing.1'),
							marginBottom: theme('spacing.1'),
							color: theme('colors.gray.800'),
						},
						h6: {
							fontSize: theme('fontSize.base'),
							fontWeight: theme('fontWeight.normal'),
							marginTop: theme('spacing.1'),
							marginBottom: theme('spacing.1'),
							color: theme('colors.gray.800'),
						},
					},
				},
			}),
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			spacing: {
				// Tailwind's default spacing scale
				...defaultTheme.spacing,
				// Extending with additional values
				'13': '3.25rem',
				'14': '3.5rem',
				'15': '3.75rem',
				'16': '4rem',
				'17': '4.25rem',
				'18': '4.5rem',
				'19': '4.75rem',
				'20': '5rem',
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;

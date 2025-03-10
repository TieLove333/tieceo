import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { breakpoints } from './foundations/breakpoints';
import { buttonStyles } from './components/button';
import { badgeStyles } from './components/badge';
import { linkStyles } from './components/link';
import { drawerStyles } from './components/drawer';
import { CardComponent } from './additions/card/Card';
import { CardBodyComponent } from './additions/card/CardBody';
import { CardHeaderComponent } from './additions/card/CardHeader';
import { MainPanelComponent } from './additions/layout/MainPanel';
import { PanelContentComponent } from './additions/layout/PanelContent';
import { PanelContainerComponent } from './additions/layout/PanelContainer';
// import { mode } from "@chakra-ui/theme-tools";

// Gray theme configuration based on Purity UI documentation
const theme = extendTheme(
	{
		colors: {
			gray: {
				50: '#f9fafb',
				100: '#f3f4f6',
				200: '#e5e7eb',
				300: '#d1d5db',
				400: '#9ca3af',
				500: '#6b7280',
				600: '#4b5563',
				700: '#374151',
				800: '#1f2937',
				900: '#111827'
			},
			brand: {
				50: '#e6f1ff',
				100: '#b3d7ff',
				200: '#80bdff',
				300: '#4da3ff',
				400: '#1a89ff',
				500: '#0070e0',
				600: '#0057b3',
				700: '#003d80',
				800: '#00244d',
				900: '#000b1a'
			}
		},
		styles: {
			global: {
				body: {
					bg: 'gray.50',
					color: 'gray.700'
				}
			}
		},
		components: {
			Card: {
				baseStyle: {
					container: {
						borderRadius: 'xl',
						boxShadow: 'sm',
						bg: 'white'
					}
				}
			},
			Button: {
				baseStyle: {
					borderRadius: 'xl'
				}
			}
		}
	},
	breakpoints,
	globalStyles,
	buttonStyles,
	badgeStyles,
	linkStyles,
	drawerStyles,
	CardComponent,
	CardBodyComponent,
	CardHeaderComponent,
	MainPanelComponent,
	PanelContentComponent,
	PanelContainerComponent
);

export default theme;

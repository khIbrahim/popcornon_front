import type { ToasterProps } from 'sonner';

const toastConfig: ToasterProps = {
	position: 'top-right',
	duration: 5000, // Duration in milliseconds
	theme: 'light',
	closeButton: true,
	swipeDirections: ['top', 'bottom'],
};

export default toastConfig;
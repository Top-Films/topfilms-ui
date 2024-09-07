import { LoadingOverlay } from '@mantine/core';

// Loading overlay
export default function Loader(props: {
	isLoading: boolean
}) {
	return (
		<LoadingOverlay 
			visible={props.isLoading} 
			zIndex={1000} 
			overlayProps={
				{ 
					backgroundOpacity: 0.10, 
					blur: 1 
				}
			} 
			loaderProps={
				{ 
					type: 'bars', 
					color: '#309cf2' 
				}
			} 
		/>
	);
}
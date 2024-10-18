import {
	ActionIcon,
	Badge,
	Card,
	Group,
	rem,
	Text,
	useMantineTheme
} from '@mantine/core';
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import classes from './movie-list-details.module.css';

export function MovieListDetails() {
	const theme = useMantineTheme();

	return (
		<Card withBorder padding='lg' radius='md' className={classes.card}>
			<Badge w='fit-content' variant='light'>
				decorations
			</Badge>

			<Text fw={700} className={classes.title} mt='xs'>
				Top 50 underrated plants for house decoration
			</Text>

			<Group mt='lg'>
				<div>
					<Text fw={500}>Elsa Gardenowl</Text>
					<Text fz='xs' c='dimmed'>
						posted 34 minutes ago
					</Text>
				</div>
			</Group>

			<Card.Section className={classes.footer}>
				<Group justify='space-between'>
					<Text fz='xs' c='dimmed'>
						733 people liked this
					</Text>
					<Group gap={0}>
						<ActionIcon variant='subtle' color='gray'>
							<IconHeart
								style={{ width: rem(20), height: rem(20) }}
								color={theme.colors.red[6]}
								stroke={1.5}
							/>
						</ActionIcon>
						<ActionIcon variant='subtle' color='gray'>
							<IconBookmark
								style={{ width: rem(20), height: rem(20) }}
								color={theme.colors.yellow[6]}
								stroke={1.5}
							/>
						</ActionIcon>
						<ActionIcon variant='subtle' color='gray'>
							<IconShare
								style={{ width: rem(20), height: rem(20) }}
								color={theme.colors.blue[6]}
								stroke={1.5}
							/>
						</ActionIcon>
					</Group>
				</Group>
			</Card.Section>
		</Card>
	);
}
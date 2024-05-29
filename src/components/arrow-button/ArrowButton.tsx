import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { FC } from 'react';
import { clsx } from'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface Props {
	onClick: OnClick;
	show: boolean;
}

export const ArrowButton: FC<Props> = ({onClick, show}) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx(styles.container, show && styles.container_open)}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, show && styles.arrow_open)} />
		</div>
	);
};

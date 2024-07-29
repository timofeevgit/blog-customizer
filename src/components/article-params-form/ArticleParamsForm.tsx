import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, FormEvent, useRef, useEffect } from'react';
import { clsx } from'clsx';
import { Select } from '../select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';


type ArticleParamsFormProps = {
	params: ArticleStateType;
	onChange: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({params, onChange}: ArticleParamsFormProps) => {
	// hooks
	const [show, setShow] =  useState(false);
	const [fontFamilyOption, setFontFamilyOption] = useState(
		params.fontFamilyOption
	);
	const [fontSizeOption, setFontSizeOption] = useState(params.fontSizeOption);
	const [fontColor, setFontColor] = useState(params.fontColor);
	const [backgroundColor, setBackground] = useState(params.backgroundColor);
	const [contentWidth, setContentWidth] = useState(params.contentWidth);

	// сабмит формы
	const formSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	// сброс формы
	const formReset = () => {
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontSizeOption(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		onChange(defaultArticleState);
	};

	// реализация закрытия формы по оверлею и на esc
	const formRef = useRef<HTMLFormElement>(null);
	const toggleButtonForm = () => {
		setShow(!show);
	};

	useEffect(() => {
		if (!show) return;

		const handleOutsideClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				toggleButtonForm();
			}
		};

		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				toggleButtonForm();
			}
		};

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [show, toggleButtonForm, formRef]);


	return (
		<>
			<ArrowButton show={show} onClick={() => setShow(!show)}  />
			<aside className={clsx(styles.container, show && styles.container_open)}>
				<form
				    ref={formRef}
					className={styles.form}
					onSubmit={formSubmit}>
					<h2
						className={styles.title}>Задайте параметры</h2>
					<Select
						title={'Шрифт'}
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						name={'fontSize'}
						title={'Размер шрифта'}
						selected={fontSizeOption}
						options={fontSizeOptions}
						onChange={setFontSizeOption}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackground}
					/>
					<Select
						title={'Ширина контента'}
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

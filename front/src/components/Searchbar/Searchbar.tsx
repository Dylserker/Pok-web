import type { ChangeEvent, ComponentProps } from 'react';
import './Searchbar.css';

type SearchbarProps = Omit<ComponentProps<'input'>, 'type' | 'onChange'> & {
    containerClassName?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
};

function Searchbar({
    containerClassName,
    className,
    placeholder = 'Rechercher...',
    onChange,
    onValueChange,
    ...inputProps
}: SearchbarProps) {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event);
        onValueChange?.(event.target.value);
    };

    return (
        <div className={`searchbar ${containerClassName ?? ''}`.trim()}>
            <input
                type="search"
                className={className}
                placeholder={placeholder}
                onChange={handleChange}
                {...inputProps}
            />
        </div>
    );
}

export default Searchbar;
import React from 'react';

import {Label, Text} from '@gravity-ui/uikit';

import {block} from '../../../utils/cn';

import i18n from './i18n';

import './FilterValue.scss';

const b = block('filter-value');

interface FilterValueProps {
    className?: string;

    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onClear: VoidFunction;

    fieldName: React.ReactNode;
    fieldValue?: React.ReactNode;
    emptyValueText?: React.ReactNode;

    hideFieldName?: boolean;
}

export function FilterValue(props: FilterValueProps) {
    const {onClick, onClear, fieldName, fieldValue, emptyValueText, hideFieldName, className} =
        props;

    const WrapperTag = typeof onClick === 'function' ? 'button' : 'span';

    const renderDelimiter = fieldValue || emptyValueText;

    return (
        <Label
            className={b(null, className)}
            size="s"
            theme="unknown"
            type="close"
            onClose={onClear}
            closeButtonLabel={i18n('button.aria-label', {fieldName})}
        >
            <WrapperTag className={b('content', {type: WrapperTag})} onClick={onClick}>
                {hideFieldName ? null : `${fieldName}`}
                {renderDelimiter ? ': ' : null}
                {fieldValue ? (
                    <Text variant="subheader-1">{fieldValue}</Text>
                ) : (
                    <Text color="secondary">{emptyValueText}</Text>
                )}
            </WrapperTag>
        </Label>
    );
}
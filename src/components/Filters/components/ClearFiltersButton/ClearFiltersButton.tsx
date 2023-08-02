import React from 'react';

import {Button, Icon} from '@gravity-ui/uikit';
import {ArrowRotateLeft} from '@gravity-ui/icons';

import {block} from '../../../utils/cn';

import i18n from './i18n';

import './ClearFiltersButton.scss';

const b = block('clear-filters-button');

interface ClearFiltersButtonProps {
    text?: string;
    className?: string;

    onClick: () => void;
}

export function ClearFiltersButton(props: ClearFiltersButtonProps) {
    const {className, text = i18n('button.reset.text'), onClick} = props;

    return (
        <Button
            className={b(null, className)}
            size="s"
            view="flat"
            onClick={onClick}
            qa="reset-filters"
        >
            <Icon className={b('icon')} data={ArrowRotateLeft} size={12} />
            {text}
        </Button>
    );
}

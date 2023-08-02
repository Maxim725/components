import React from 'react';

import {Button, Icon, List, Text, useMobile} from '@gravity-ui/uikit';
import {HelpPopover} from '../../../HelpPopover';
import {Check} from '@gravity-ui/icons';

import {block} from '../../../utils/cn';

import {DESKTOP_ITEM_HEIGHT, MOBILE_ITEM_HEIGHT} from './constants';
import i18n from './i18n';

import './FilterListContainer.scss';

const b = block('filter-list-container');

interface HelpContentProps {
    title: string;
    description: React.ReactNode;
}
function HelpContent({title, description}: HelpContentProps) {
    return (
        <div>
            <Text as="h3" variant="subheader-3">
                {title}
            </Text>
            <Text as="p" color="secondary" className={b('help-content-description')}>
                {description}
            </Text>
        </div>
    );
}

export interface FilterListContainerOption {
    value: string;
    label: string;
    description?: string;
}

function FilterListContainerOptionRenderer({
    option,
    selected,
}: {
    option: FilterListContainerOption;
    selected: boolean;
}) {
    return (
        <React.Fragment>
            <div className={b('item-text')} tabIndex={0}>
                {option.label}
            </div>
            {option.description ? (
                <div
                    className={b('item-description')}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <HelpPopover
                        content={
                            <HelpContent title={option.label} description={option.description} />
                        }
                    />
                </div>
            ) : null}
            {selected ? (
                <Icon className={b('tick')} data={Check} size={16} aria-hidden="true" />
            ) : null}
        </React.Fragment>
    );
}

export interface FilterListContainerProps {
    value: string[];
    options: FilterListContainerOption[];

    multiple?: boolean;
    hideControls?: boolean;

    onClose: () => void;
    onSubmit: (values: string[]) => void;

    filterable?: boolean;
    virtualized?: boolean;
    filterPredicate?: (search: string) => (item: FilterListContainerOption) => boolean;
}

const defaultFilterPredicate = (search: string) => (option: FilterListContainerOption) =>
    search ? option.label.toLowerCase().includes(search.toLowerCase()) : true;

export function FilterListContainer(props: FilterListContainerProps) {
    const {
        value,
        options,
        multiple = true,
        onClose,
        onSubmit,
        hideControls,
        filterable = true,
        virtualized = true,
        filterPredicate = defaultFilterPredicate,
    } = props;

    const [mobile] = useMobile();

    const [selectedItems, setSelectedItems] = React.useState<string[]>(value);

    const handleItemClick = React.useCallback(
        (item: FilterListContainerOption) => {
            if (multiple) {
                setSelectedItems((currentSelectedItems) => {
                    if (currentSelectedItems.includes(item.value)) {
                        return [...currentSelectedItems.filter((el) => el !== item.value)];
                    } else {
                        const valuesArray = [...currentSelectedItems, item.value];

                        return [...new Set<string>(valuesArray)];
                    }
                });
            } else {
                onSubmit([item.value]);
            }
        },
        [multiple, onSubmit],
    );

    return (
        <React.Fragment>
            <List<FilterListContainerOption>
                itemsClassName={b('list', {virtualized, mobile})}
                itemClassName={b('item', {mobile})}
                filterClassName={b('search')}
                items={options}
                itemHeight={mobile ? DESKTOP_ITEM_HEIGHT : MOBILE_ITEM_HEIGHT}
                onItemClick={handleItemClick}
                filterable={filterable}
                virtualized={virtualized}
                autoFocus={true}
                filterItem={filterPredicate}
                size={mobile ? 'l' : 'm'}
                renderItem={(item) => (
                    <FilterListContainerOptionRenderer
                        option={item}
                        selected={selectedItems.includes(item.value)}
                    />
                )}
            />
            {hideControls ? null : (
                <div className={b('actions')}>
                    {mobile ? null : (
                        <Button view="flat" onClick={onClose}>
                            {i18n('action.cancel')}
                        </Button>
                    )}
                    <Button
                        size={mobile ? 'xl' : 'm'}
                        view="action"
                        onClick={() => onSubmit(selectedItems)}
                    >
                        {i18n('action.submit')}
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}

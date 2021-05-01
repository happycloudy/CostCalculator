import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";

const SortWorkersDropdown = (props) => {
    const [sortType, setSortType] = useState('Фильтр')
    const handleSortType = async (type) => {
        switch (type) {
            case 1:
                setSortType('Сортировать по количеству задач в убывающем порядке')
                await props.reloadInfo()
                let tmp1 = [...props.data].sort((worker1, worker2) => worker1.tasks.length < worker2.tasks.length ? 1 : -1)
                props.setData(tmp1)
                console.log('сортировка по уб')
                break
            case 2:
                setSortType('Сортировать по количеству задач в возрастающем порядке')
                await props.reloadInfo()
                let tmp2 = [...props.data].sort((worker1, worker2) => worker1.tasks.length > worker2.tasks.length ? 1 : -1)
                props.setData(tmp2)
                console.log('сортировка по возр')
                break
            case 3:
                setSortType('Показать только тех, у кого есть задачи')
                await props.reloadInfo()
                let tmp3 = [...props.data].filter(worker => worker.tasks.length > 0)
                props.setData(tmp3)
                console.log('показаны только с заданиями')
                break
            default:
                console.log('Не выбрано ничего из существующего')
                break
        }
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success " id="dropdown-basic">
                {sortType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={async () => await handleSortType(1)}>
                    Сортировать по количеству задач в убывающем порядке (по-умолчанию)
                </Dropdown.Item>
                <Dropdown.Item onClick={async () => await handleSortType(2)}>
                    Сортировать по количеству задач в возрастающем порядке
                </Dropdown.Item>
                <Dropdown.Item onClick={async () => await handleSortType(3)}>
                    Показать только тех, у кого есть задачи
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SortWorkersDropdown;
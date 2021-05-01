import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";

const SortWorkersDropdown = (props) => {
    const [sortType, setSortType] = useState('Фильтр')
    const handleSortType = (type) => {
        switch (type) {
            case 1:
                setSortType('Количеству задач в убывающем порядке')
                let tmp1 = [...props.data].sort((worker1, worker2) => worker1.tasks.length < worker2.tasks.length ? 1 : -1)
                props.setData(tmp1)
                console.log('сортировка по уб')
                break
            case 2:
                setSortType('Количеству задач в возрастающем порядке')
                let tmp2 = [...props.data].sort((worker1, worker2) => worker1.tasks.length > worker2.tasks.length ? 1 : -1)
                props.setData(tmp2)
                console.log('сортировка по возр')
                break
            case 3:
                setSortType('Показать только тех, у кого есть задачи')
                let tmp3 = [...props.data].filter(worker => worker.tasks.length > 0)
                console.log(tmp3)
                props.setData(tmp3)
                console.log('показаны только с заданиями')
                break
        }
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {sortType}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortType(1)}>
                    Количеству задач в убывающем порядке (по-умолчанию)
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortType(2)}>
                    Количеству задач в возрастающем порядке
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortType(3)}>
                    Показать только тех, у кого есть задачи
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SortWorkersDropdown;
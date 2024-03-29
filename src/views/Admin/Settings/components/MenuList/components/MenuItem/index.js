import React from 'react'
import { Button, Popconfirm } from 'antd'

const MenuItem = ({ item, noActions, handleEditMenu, handleDeleteMenu, handleAddSubmenu }) => {

    const renderChildNodes = (listItem) => {
        return (
            <ul className="list-sub-menu">
                {
                    listItem?.sort((a, b) => {
                        return (a?.order || 0) - (b?.order || 0);
                    })?.map((child) => {
                        return (
                            <MenuItem key={child?.id} item={child} handleEditMenu={handleEditMenu} handleDeleteMenu={handleDeleteMenu} handleAddSubmenu={handleAddSubmenu} noActions={true} />
                        )
                    })
                }
            </ul>
        )

    };

    return (
        <li id={item?.id} className='menu-item'>
            <div className='menu-content'>
                {item?.image && <img src={item?.image} alt="" />}
                <a href={item?.href || ''} target={item?.target || ''}>{item?.title || ''}</a>

                <div className='group-actions'>
                    {!noActions && (<Button type="link" onClick={() => handleAddSubmenu(item?.id)}>Add Sub Menu</Button>)}
                    <Button type="link" className='button-edit' onClick={() => handleEditMenu(item)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete this menu?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteMenu(item?.id, item?.parentMenuId)}
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </div>
            </div>
            {item?.child?.length > 0 && renderChildNodes(item?.child)}
        </li >
    )
}

export default MenuItem
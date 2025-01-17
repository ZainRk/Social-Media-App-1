import { SettingsContext } from '@/context/settings/settings-context'
import { Avatar, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import Box from './Box/Box'
import css from "@/styles/post.module.css"
import cx from "classnames"
import Link from 'next/link'

const Comment = ({data}) => {
    const {settings: {theme}} = useContext(SettingsContext)
  return (
    <Box>
        <Flex gap={".5rem"}>
        {/* Avatar of User  */}
        <Link
                href={`/profile/${data?.author?.id}?person=${data?.author?.first_name}`}
                passHref
              >
        <Avatar
        size={30} src={data?.author?.image_url}
        />
        </Link>

        {/* person Component  */}

        <Flex vertical flex={1} gap={".5rem"} className={cx(css.comment, css[theme])}>

{/* Name and date  */}

<Flex align='center' justify='space-between'>
    {/* Name  */}
    <Link
                href={`/profile/${data?.author?.id}?person=${data?.author?.first_name}`}
                passHref
              >
    <Typography.Text>
        {data?.author?.first_name} {data?.author?.last_name}
    </Typography.Text>
    </Link>

    {/* Data  */}

    <Typography.Text type='secondary' className='typoCaption' strong>
        {dayjs(data?.created_at).format("DD MM YYYY")}
    </Typography.Text>
</Flex>

{/* Comment Text  */}
<Typography.Text className='typoBody2'>{data?.comment}</Typography.Text>
        </Flex>
        </Flex>
    </Box>
  )
}

export default Comment
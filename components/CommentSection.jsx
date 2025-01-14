import { Icon } from '@iconify/react'
import { Button, Flex } from 'antd'
import React, { useEffect } from 'react'
import css from "@/styles/commentSection.module.css"
import { useAutoAnimate } from "@formkit/auto-animate/react";
import CommentInput from './CommentInput'
import Comment from './Comment'
import { animateScroll } from 'react-scroll'

const CommentSection = ({comments, postId, queryId}) => {
    const [expanded, setExpanded] = React.useState(false)
    const [parent] = useAutoAnimate();

    useEffect(() => {
        if(expanded) {
        //   Scroll to bottom of parent 
        
        animateScroll.scrollToBottom({
            containerId: "comments-container",
            smooth: true,
            duration: 300,
        })
        }
    })
  return (

    <Flex vertical gap={"1rem"}>
        <>

{/* Load More Comments  */}

{comments?.length > 1 && (
    <Button type='text' onClick={() => setExpanded((prev) => !prev)}>
        <Flex align='center' gap={".5rem"} justify='center'> 
        <Icon icon={expanded ? "ic:outline-expand-less" : "ic:outline-expand-more"} />
        {expanded ? "Show Less" : "Show More Comments"}
        </Flex>
    </Button>
)}

{/* Comments  */}

{
    comments?.length > 0 && (
        <Flex
        ref={parent}
        id='comments-container'
         vertical gap={".5rem"} className={css.commentsContainer}>
{!expanded ? (
    <Comment
    data = {comments[comments.length - 1]}
    />
) : (
    comments.map((comment, index) => (
        <Comment key={index} data={comment}/>
    ))
)}
        </Flex>
    )
}
</>

{/* Comment Input  */}

<CommentInput setExpanded={setExpanded} queryId={queryId} postId={postId}/>
    </Flex>
  )
}

export default CommentSection
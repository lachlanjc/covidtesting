import React, { useEffect, useRef, useState } from 'react'
import { Flex, Label, Input, Link as A } from 'theme-ui'
import { filter, kebabCase } from 'lodash'
import Link from 'next/link'
import states from '../public/states.json'
import useFocusable from '../lib/use-focusable'

const StateList = () => {
  const [jump, setJump] = useState('')
  const [list, setList] = useState(states)
  const onChange = e =>
    setJump(e.target.value.toString().match(/[A-Za-z\s]+/g) || '')
  useEffect(() => {
    if (jump.toString().length > 0) {
      const j = jump.toString().toLowerCase()
      setList(
        filter(
          states,
          s =>
            s.name.toLowerCase().includes(j) ||
            s.abbrev.toLowerCase().includes(j)
        )
      )
    } else {
      setList(states)
    }
  }, [jump])

  const input = useRef(null)
  useFocusable(input, 'Filter list')

  return [
    <Label htmlFor="state" variant="hidden" key="label">
      Filter list
    </Label>,
    <Input
      key="input"
      type="search"
      name="state"
      onChange={onChange}
      placeholder="Filter list…"
      value={jump}
      ref={input}
    />,
    <Flex sx={{ flexWrap: 'wrap', mx: -2, mt: 3 }} key="list">
      {list.map(state => (
        <Link href={`/${kebabCase(state.name)}`} key={state.abbrev} passHref>
          <A
            children={state.name}
            sx={{
              cursor: 'pointer',
              borderRadius: 'circle',
              fontWeight: '400',
              lineHeight: 'caption',
              textDecoration: 'none',
              color: 'text',
              px: 2,
              py: 1,
              mr: 2,
              mb: 2,
              transition: '.125s ease-in-out box-shadow',
              ':focus, :hover': {
                boxShadow: theme => `0 0 0 2px ${theme.colors.red}`,
                color: 'red'
              },
              ':active': { color: 'accent' }
            }}
          />
        </Link>
      ))}
    </Flex>
  ]
}

export default StateList

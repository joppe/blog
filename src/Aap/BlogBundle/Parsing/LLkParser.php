<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class LLkParser
 *
 * @package Aap\BlogBundle\Parsing
 */
class LLkParser
{
    /**
     * @var array
     */
    private $lookahead;

    /**
     * @var LL1Lexer
     */
    private $input;

    /**
     * @var int
     */
    private $bufferSize;

    /**
     * @var int
     */
    private $index;

    /**
     * @param LL1Lexer $input
     * @param int $bufferSize
     */
    public function __constructor($input, $bufferSize = 1)
    {
        $this->lookahead = array();
        $this->input = $input;
        $this->bufferSize = $bufferSize;
        $this->index = 0;

        for ($i = 0; $i < $this->bufferSize; $i += 1) {
            $this->consume();
        }
    }

    /**
     * @return $this
     */
    protected function consume()
    {
        $this->lookahead[$this->index] = $this->input->nextToken();
        $this->index = ($this->index + 1) % $this->bufferSize;

        return $this;
    }

    /**
     * @param int $offset
     * @return Token
     */
    protected function getLookaheadByOffset($offset)
    {
        return $this->lookahead[($this->index + $offset - 1) % $this->bufferSize];
    }

    /**
     * @param int $offset
     * @return string
     */
    protected function getLookaheadTypeByOffset($offset)
    {
        $token = $this->getLookaheadByOffset($offset);

        return $token->getType();
    }

    /**
     * @param int $tokenType
     * @throws \Exception
     */
    protected function match($tokenType)
    {
        if ($this->getLookaheadTypeByOffset(0) === $tokenType) {
            $this->consume();
        } else {
            throw new \Exception(sprintf(
                'Expecting "%s"; found "%s"',
                $this->input->getTokenName($tokenType),
                $this->getLookaheadByOffset(0)
            ));
        }
    }
}
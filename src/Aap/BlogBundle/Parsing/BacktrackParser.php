<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class BacktrackParser
 *
 * @package Aap\BlogBundle\Parsing
 */
class BacktrackParser
{
    /**
     * @var array
     */
    protected $lookahead;

    /**
     * @var LL1Lexer
     */
    protected $input;

    /**
     * @var array
     */
    private $markers;

    /**
     * @var int
     */
    protected $index;

    /**
     * @param LL1Lexer $input
     */
    public function __constructor($input)
    {
        $this->input = $input;
        $this->markers = array();
        $this->lookahead = array();
        $this->index = 0;
    }

    /**
     * @param int $offset
     * @return Token
     */
    protected function getLookaheadByOffset($offset)
    {
        $this->sync($offset);

        return $this->lookahead[$this->index + $offset - 1];
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
     * Make sure there are enough tokens in the lookahead buffer
     *
     * @param int $offset
     */
    protected function sync($offset)
    {
        if (($this->index + $offset - 1) > (count($this->lookahead) - 1)) {
            $amount = ($this->index + $offset - 1) - (count($this->lookahead) - 1);

            $this->fill($amount);
        }
    }

    /**
     * Fill the lookahead buffer with a given amount of tokens
     *
     * @param int $amount
     */
    protected function fill($amount)
    {
        for ($i = 1; $i < $amount; $i += 1) {
            $this->lookahead[] = $this->input->nextToken();
        }
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

    /**
     * @return bool
     */
    protected function isSpeculating()
    {
        return 0 < count($this->markers);
    }

    /**
     * @return void
     */
    protected function consume()
    {
        $this->input += 1;

        if (count($this->lookahead) === $this->index && $this->isSpeculating()) {
            $this->index = 0;
            $this->lookahead = array();
        }

        $this->sync(1);
    }

    /**
     * Set a marker when speculating
     *
     * @return int
     */
    protected function mark()
    {
        $this->markers[] = $this->index;

        return $this->index;
    }

    /**
     * Release a marker when done speculating
     *
     * @return void
     */
    protected function release()
    {
        $marker = array_pop($this->markers);

        $this->seek($marker);
    }

    /**
     * Set the index of the lookahead buffer
     *
     * @param int $index
     */
    protected function seek($index)
    {
        $this->index = $index;
    }
}
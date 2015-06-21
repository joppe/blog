<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class LL1Parser
 */
class LL1Parser
{
    /**
     * @var Token
     */
    protected $lookahead;

    /**
     * @var LL1Lexer
     */
    protected $input;

    /**
     * @param LL1Lexer $input
     * @param int $bufferSize
     */
    public function __constructor($input, $bufferSize = 1)
    {
        $this->input = $input;
        $this->lookahead = $this->input->nextToken();
    }

    /**
     * @return $this
     */
    protected function consume()
    {
        $this->lookahead = $this->input->nextToken();

        return $this;
    }

    /**
     * @param int $tokenType
     * @throws \Exception
     */
    protected function match($tokenType)
    {
        if ($this->lookahead->getType() === $tokenType) {
            $this->consume();
        } else {
            throw new \Exception(sprintf(
                'Expecting "%s"; found "%s"',
                $this->input->getTokenName($tokenType),
                $this->lookahead->getType()
            ));
        }
    }
}
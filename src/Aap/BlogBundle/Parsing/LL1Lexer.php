<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Parsing;

/**
 * Class LL1Lexer
 *
 * @package Aap\BlogBundle\Parsing
 */
abstract class LL1Lexer
{
    /**
     * @const string
     */
    const EOF = '-1';

    /**
     * @const int
     */
    const INVALID_TOKE_TYPE = 0;

    /**
     * @const int
     */
    const EOF_TYPE = 1;

    /**
     * @var array
     */
    protected static $tokenNames = array(
        self::INVALID_TOKE_TYPE => 'n/a',
        self::EOF_TYPE => 'EOF'
    );

    /**
     * @var string
     */
    private $input;

    /**
     * @var int
     */
    private $length;

    /**
     * @var int
     */
    protected $index;

    /**
     * @var string
     */
    public $char;

    /**
     * Lexer constructor.
     *
     * @param string $input
     */
    public function __construct($input)
    {
        $this->input = $input;
        $this->length = strlen($this->input);
        $this->index = 0;
        $this->char = $this->getCharAtIndex($this->index);
    }

    /**
     * @return $this
     * @throws \Exception
     */
    protected function consume()
    {
        $this->index += 1;

        if ($this->index >= $this->length) {
            $this->char = self::EOF;
        } else {
            $this->char = $this->getCharAtIndex($this->index);
        }

        return $this;
    }

    /**
     * @param string $char
     * @return $this
     * @throws \Exception
     */
    protected function match($char)
    {
        if ($this->char === $char) {
            $this->consume();
        } else {
            throw new \Exception(sprintf(
                'Expecting "%s"; found "%s"',
                $char,
                $this->char
            ));
        }

        return $this;
    }

    /**
     * @param int $index
     * @return string
     * @throws \Exception
     */
    protected function getCharAtIndex($index)
    {
        if ($index < 0 || $index > $this->length) {
            throw new \Exception('Invalid index: %d', $index);
        }

        return substr($this->input, $index, 1);
    }

    /**
     * @param int $tokenType
     * @return mixed
     * @throws \Exception
     */
    public function getTokenName($tokenType)
    {
        if (false === isset(self::$tokenNames[$tokenType])) {
            throw new \Exception(sprintf('Unsuported token type %d', $tokenType));
        }

        return self::$tokenNames[$tokenType];
    }

    /**
     * @param int $tokenType
     * @param string $text
     * @return Token
     * @throws \Exception
     */
    protected function createToken($tokenType, $text)
    {
        return new Token($tokenType, $this->getTokenName($tokenType), $text);
    }

    /**
     * @return Token
     */
    abstract public function nextToken();
}
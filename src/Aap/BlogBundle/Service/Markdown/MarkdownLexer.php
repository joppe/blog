<?php
/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

namespace Aap\BlogBundle\Service\Markdown;

use Aap\BlogBundle\Parsing\LL1Lexer;
use Aap\BlogBundle\Parsing\Token;

/**
 * Class MarkdownLexer
 *
 * @package Aap\BlogBundle\Service\Markdown
 */
class MarkdownLexer extends LL1Lexer
{
    /**
     * @var int
     */
    private $positionInLine;

    /**
     * @const int
     */
    const HASH = 2;

    /**
     * @const int
     */
    const TEXT = 3;

    /**
     * MarkdownLexer constructor.
     *
     * @param string $input
     */
    public function __construct($input)
    {
        parent::__construct($input);

        $this->positionInLine = 0;

        self::$tokenNames = array_merge(parent::$tokenNames, array(
            self::HASH => '#',
            self::TEXT => 'TEXT'
        ));
    }

    /**
     * @return Token
     * @throws \Exception
     */
    public function nextToken()
    {
        $token = null;

        while ($this->char !== self::EOF) {
            if ($this->isNewLine()) {
                $this->consume();
                $this->positionInLine = 0;
                continue;
            }

            if ($this->isWhitespace()) {
                $this->consumeWhitespace();
                continue;
            }

            if ($this->isHash()) {
                $token = $this->createToken(self::HASH, '#');
                $this->consume();
            } else if ($this->isText()) {
                $token = $this->createText();
            }

            $this->positionInLine += 1;

            if (null === $token) {
                throw new \Exception(sprintf('Invalid character "%s"', $this->char));
            } else {
                break;
            }
        }

        if (null === $token) {
            $token = $this->createToken(self::EOF_TYPE, '<EOF>');
        }

        return $token;
    }

    /**
     * @return bool
     */
    private function isText()
    {
        return $this->isLetter() || $this->isNumber() || $this->isWhitespace();
    }

    /**
     * @return Token
     */
    private function createText()
    {
        $buffer = '';

        do {
            $buffer .= $this->char;
            $this->consume();
        } while ($this->isText());

        return $this->createToken(self::TEXT, $buffer);
    }

    /**
     * @return bool
     */
    private function isLetter()
    {
        return ($this->char >= 'a' && $this->char <= 'z') || $this->char >= 'A' && $this->char <= 'Z';
    }

    /**
     * @return bool
     */
    private function isNumber()
    {
        return $this->char >= '0' && $this->char <= '9';
    }

    /**
     * @return bool
     */
    private function isHash()
    {
        return 0 === $this->positionInLine && '#' === $this->char;
    }

    /**
     * @return bool
     */
    private function isWhitespace()
    {
        return 1 === preg_match('/\s/', $this->char);
    }

    /**
     * @return void
     */
    private function consumeWhitespace()
    {
        do {
            $this->consume();
        } while ($this->isWhitespace());
    }

    /**
     * @return bool
     */
    private function isNewLine()
    {
        return 1 === preg_match('/\n/', $this->char);
    }
}